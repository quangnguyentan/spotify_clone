import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SongService } from 'src/song/song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { AlbumService } from 'src/album/album.service';
import { Model } from 'mongoose';
import { Album } from 'src/album/entities/album.entity';
import { Song } from 'src/song/entities/song.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FileUploadService } from 'src/fileUpload/file-upload.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async createSong(
    dto: CreateSongDto,
    image: Express.Multer.File,
    audio: Express.Multer.File,
  ) {
    let imageUrl: string;
    let audioUrl: string;
    if (image && audio) {
      try {
        imageUrl = await this.fileUploadService.uploadFile(image);
        audioUrl = await this.fileUploadService.uploadFile(audio);
      } catch (error) {
        throw new BadRequestException(
          `Failed to upload image and audio: ${error.message}`,
        );
      }
    } else {
      throw new BadRequestException('Image and audio file is required');
    }
    const song = this.songModel.create({
      title: dto.title,
      artist: dto.artist,
      albumId: dto.albumId,
      duration: dto.duration,
      imageUrl,
      audioUrl,
    });
    (await song).save();
    if (dto.albumId) {
      await this.albumModel.findByIdAndUpdate(dto.albumId, {
        $push: { songs: (await song)?._id },
      });
    }
    return song;
  }
  async deleteSong(id: string) {
    const song = await this.songModel.findById(id);
    if (song?.albumId) {
      await this.songModel.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    return await this.songModel.findByIdAndDelete(id);
  }
  async createAlbum(dto: CreateAlbumDto, image: Express.Multer.File) {
    let imageUrl: string;
    if (image) {
      try {
        imageUrl = await this.fileUploadService.uploadFile(image);
      } catch (error) {
        throw new BadRequestException(
          `Failed to upload image and audio: ${error.message}`,
        );
      }
    } else {
      throw new BadRequestException('Image and audio file is required');
    }
    const album = this.albumModel.create({
      title: dto.title,
      artist: dto.artist,
      imageUrl,
      releaseYear: dto.releaseYear,
    });
    return (await album).save();
  }
  async deleteAlbum(id: string) {
    await this.songModel.deleteMany({ albumId: id });
    return await this.albumModel.findByIdAndDelete(id);
  }
}
