import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { resolve } from 'path';
import * as fs from 'fs';
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('callback')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async callbackAuth(
    @Body() createAuthDto: CreateAuthDto,
    @UploadedFile() image: Express.Multer.File,
    @Response() res: any,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }
    try {
      const newUser = await this.authService.callbackAuth(createAuthDto, image);
      return res.status(201).json({
        message: 'User created successfully',
        user: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
