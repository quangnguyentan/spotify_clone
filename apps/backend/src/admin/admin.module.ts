import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from 'src/song/entities/song.entity';
import { Album, AlbumSchema } from 'src/album/entities/album.entity';
import { FileUploadModule } from 'src/fileUpload/file-upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: Album.name, schema: AlbumSchema },
    ]),
    FileUploadModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
