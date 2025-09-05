import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.createSong(createSongDto);
  }

  @Get()
  async getAllSongs(@Response() res: any) {
    try {
      const songs = await this.songService.getAllSongs();
      res.status(200).json(songs);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('featured')
  async getFeaturedSongs(@Response() res: any) {
    try {
      const songs = await this.songService.getFeaturedSongs();
      res.status(200).json(songs);
    } catch (error) {
      console.log(error);
    }
  }
  @Get('made-for-you')
  async getMadeForYouSongs(@Response() res: any) {
    try {
      const songs = await this.songService.getMadeForYouSongs();
      res.status(200).json(songs);
    } catch (error) {
      console.log(error);
    }
  }
  @Get('trending')
  async getTrendingSongs(@Response() res: any) {
    try {
      const songs = await this.songService.getTrendingSongs();
      res.status(200).json(songs);
    } catch (error) {
      console.log(error);
    }
  }
}
