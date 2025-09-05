import { Controller, Get, Param, Response } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(@Response() res: any) {
    try {
      const albums = await this.albumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res: any) {
    const album = await this.albumService.getAlbumById(id);
    res.status(200).json(album);
  }
}
