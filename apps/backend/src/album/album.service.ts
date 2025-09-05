import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Model } from 'mongoose';
import { Album } from './entities/album.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}
  async getAllAlbums() {
    return this.albumModel.find();
  }
  async getAlbumById(id: string) {
    return this.albumModel.findById(id);
  }
}
