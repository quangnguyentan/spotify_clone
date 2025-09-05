import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Response,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  UseGuards,
  Request,
  Next,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateSongDto } from './dto/create-song.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import * as multer from 'multer';
import { resolve } from 'path';
import * as fs from 'fs';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = resolve(process.cwd(), 'src', 'upload');
    if (!fs.existsSync(uploadDir)) {
      // Sử dụng fs.existsSync
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('Upload directory created:', uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

@UseGuards(AuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('songs')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ],
      { storage },
    ),
  )
  async createSong(
    @Body() createSongDto: CreateSongDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Response() res: any,
  ) {
    const image = files?.image?.[0];
    const audio = files?.audio?.[0];
    if (!image || !audio) {
      return res.status(400).json({
        message: 'Image and audio files are required',
      });
    }
    const song = await this.adminService.createSong(
      createSongDto,
      image,
      audio,
    );
    return res.status(201).json(song);
  }

  @Delete('songs/:id')
  async deleteSong(@Param('id') id: string, @Response() res: any) {
    try {
      const song = await this.adminService.deleteSong(id);
      return res.status(200).json({
        message: 'Song deleted successfully',
        song,
      });
    } catch (error) {
      console.error('Error deleting song:', error);
      return res.status(500).json({
        message: 'Failed to delete song',
        error: error.message,
      });
    }
  }
  @Post('albums')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async createAlbum(
    @Body() createAuthDto: CreateAlbumDto,
    @UploadedFile() image: Express.Multer.File,
    @Response() res: any,
  ) {
    try {
      const album = await this.adminService.createAlbum(createAuthDto, image);
      return res.status(201).json({
        message: 'Album created successfully',
        album: album,
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('albums/:id')
  async deleteAlbum(@Param('id') id: string, @Response() res: any) {
    try {
      const album = await this.adminService.deleteAlbum(id);
      return res.status(200).json({
        message: 'Album deleted successfully',
        album,
      });
    } catch (error) {
      console.error('Error deleting album:', error);
      return res.status(500).json({
        message: 'Failed to delete album',
        error: error.message,
      });
    }
  }
  @Get('check')
  async checkAdmin(@Response() res: any) {
    res.status(200).json({ admin: true });
  }
}
