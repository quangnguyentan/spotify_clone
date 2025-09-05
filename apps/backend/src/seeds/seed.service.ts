import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Album } from '../album/entities/album.entity';
import { Song } from '../song/entities/song.entity';

interface SeedSong {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  plays: number;
}

interface SeedAlbum {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Types.ObjectId[];
}

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}

  private readonly songs: SeedSong[] = [
    {
      title: 'City Rain',
      artist: 'Urban Echo',
      imageUrl: '/cover-images/7.jpg',
      audioUrl: '/songs/7.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 39,
    },
    {
      title: 'Neon Lights',
      artist: 'Night Runners',
      imageUrl: '/cover-images/5.jpg',
      audioUrl: '/songs/5.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 36,
    },
    {
      title: 'Urban Jungle',
      artist: 'City Lights',
      imageUrl: '/cover-images/15.jpg',
      audioUrl: '/songs/15.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 36,
    },
    {
      title: 'Neon Dreams',
      artist: 'Cyber Pulse',
      imageUrl: '/cover-images/13.jpg',
      audioUrl: '/songs/13.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 39,
    },
    {
      title: 'Summer Daze',
      artist: 'Coastal Kids',
      imageUrl: '/cover-images/4.jpg',
      audioUrl: '/songs/4.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 24,
    },
    {
      title: 'Ocean Waves',
      artist: 'Coastal Drift',
      imageUrl: '/cover-images/9.jpg',
      audioUrl: '/songs/9.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 28,
    },
    {
      title: 'Crystal Rain',
      artist: 'Echo Valley',
      imageUrl: '/cover-images/16.jpg',
      audioUrl: '/songs/16.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 39,
    },
    {
      title: 'Starlight',
      artist: 'Luna Bay',
      imageUrl: '/cover-images/10.jpg',
      audioUrl: '/songs/10.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 30,
    },
    {
      title: 'Stay With Me',
      artist: 'Sarah Mitchell',
      imageUrl: '/cover-images/1.jpg',
      audioUrl: '/songs/1.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 46,
    },
    {
      title: 'Midnight Drive',
      artist: 'The Wanderers',
      imageUrl: '/cover-images/2.jpg',
      audioUrl: '/songs/2.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 41,
    },
    {
      title: 'Moonlight Dance',
      artist: 'Silver Shadows',
      imageUrl: '/cover-images/14.jpg',
      audioUrl: '/songs/14.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 27,
    },
    {
      title: 'Lost in Tokyo',
      artist: 'Electric Dreams',
      imageUrl: '/cover-images/3.jpg',
      audioUrl: '/songs/3.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 24,
    },
    {
      title: 'Neon Tokyo',
      artist: 'Future Pulse',
      imageUrl: '/cover-images/17.jpg',
      audioUrl: '/songs/17.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 39,
    },
    {
      title: 'Purple Sunset',
      artist: 'Dream Valley',
      imageUrl: '/cover-images/12.jpg',
      audioUrl: '/songs/12.mp3',
      plays: Math.floor(Math.random() * 5000),
      duration: 17,
    },
  ];

  async run() {
    try {
      console.log('Starting database seeding...');

      // Check if songs already exist
      const songCount = await this.songModel.countDocuments();
      if (songCount > 0) {
        console.log('Songs already exist, skipping seeding.');
        return;
      }

      console.log('Clearing existing data...');
      await this.albumModel.deleteMany({});
      await this.songModel.deleteMany({});

      console.log('Inserting songs...');
      const createdSongs = await this.songModel.insertMany(this.songs);
      console.log(`Inserted ${createdSongs.length} songs.`);

      const albums: SeedAlbum[] = [
        {
          title: 'Urban Nights',
          artist: 'Various Artists',
          imageUrl: '/albums/1.jpg',
          releaseYear: 2024,
          songs: createdSongs
            .slice(0, 4)
            .map((song) => song._id) as Types.ObjectId[],
        },
        {
          title: 'Coastal Dreaming',
          artist: 'Various Artists',
          imageUrl: '/albums/2.jpg',
          releaseYear: 2024,
          songs: createdSongs
            .slice(4, 8)
            .map((song) => song._id) as Types.ObjectId[],
        },
        {
          title: 'Midnight Sessions',
          artist: 'Various Artists',
          imageUrl: '/albums/3.jpg',
          releaseYear: 2024,
          songs: createdSongs
            .slice(8, 11)
            .map((song) => song._id) as Types.ObjectId[],
        },
        {
          title: 'Eastern Dreams',
          artist: 'Various Artists',
          imageUrl: '/albums/4.jpg',
          releaseYear: 2024,
          songs: createdSongs
            .slice(11, 14)
            .map((song) => song._id) as Types.ObjectId[],
        },
      ];

      console.log('Inserting albums...');
      const createdAlbums = await this.albumModel.insertMany(albums);
      console.log(`Inserted ${createdAlbums.length} albums.`);

      console.log('Updating song album references...');
      for (let i = 0; i < createdAlbums.length; i++) {
        const album = createdAlbums[i];
        const albumSongs = albums[i].songs;
        await this.songModel.updateMany(
          { _id: { $in: albumSongs } },
          { albumId: album._id },
        );
        console.log(`Updated songs for album: ${album.title}`);
      }

      console.log('✅ Database seeded!');
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      throw error;
    }
  }
}
