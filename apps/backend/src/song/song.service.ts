import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Model } from 'mongoose';
import { Song } from './entities/song.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly songService: Model<Song>,
  ) {}

  async createSong(createSongDto: CreateSongDto) {
    const newSong = await this.songService.create(createSongDto); // Tạo và lưu luôn
    return await newSong.save(); // Trả về đối tượng đã lưu
  }

  async getAllSongs() {
    return await this.songService.find().sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo mới nhất
  }
  async getFeaturedSongs() {
    return await this.songService.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
  }
  async getMadeForYouSongs() {
    return await this.songService.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
  }
  async getTrendingSongs() {
    return await this.songService.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
  }
}
