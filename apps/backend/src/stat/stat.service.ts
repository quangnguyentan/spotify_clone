import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Song } from 'src/song/entities/song.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}
  async getStats() {
    try {
      const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
        await Promise.all([
          this.songModel.countDocuments(),
          this.albumModel.countDocuments(),
          this.userModel.countDocuments(),

          this.songModel.aggregate([
            {
              $unionWith: {
                coll: 'albums',
                pipeline: [],
              },
            },
            {
              $group: {
                _id: '$artist',
              },
            },
            {
              $count: 'count',
            },
          ]),
        ]);
      return {
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: uniqueArtists[0]?.count || 0,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
