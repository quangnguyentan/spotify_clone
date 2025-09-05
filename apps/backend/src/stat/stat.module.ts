import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stat } from './entities/stat.entity';
import { Song, SongSchema } from 'src/song/entities/song.entity';
import { Album, AlbumSchema } from 'src/album/entities/album.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
