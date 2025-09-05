import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/song/entities/song.entity';

@Injectable()
export class SongSeedService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
  ) {}

  private readonly songs = [
    {
      title: 'Stay With Me',
      artist: 'Sarah Mitchell',
      imageUrl: '/cover-images/1.jpg',
      audioUrl: '/songs/1.mp3',
      duration: 46,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Midnight Drive',
      artist: 'The Wanderers',
      imageUrl: '/cover-images/2.jpg',
      audioUrl: '/songs/2.mp3',
      duration: 41,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Lost in Tokyo',
      artist: 'Electric Dreams',
      imageUrl: '/cover-images/3.jpg',
      audioUrl: '/songs/3.mp3',
      duration: 24,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Summer Daze',
      artist: 'Coastal Kids',
      imageUrl: '/cover-images/4.jpg',
      audioUrl: '/songs/4.mp3',
      duration: 24,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Neon Lights',
      artist: 'Night Runners',
      imageUrl: '/cover-images/5.jpg',
      audioUrl: '/songs/5.mp3',
      duration: 36,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Mountain High',
      artist: 'The Wild Ones',
      imageUrl: '/cover-images/6.jpg',
      audioUrl: '/songs/6.mp3',
      duration: 40,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'City Rain',
      artist: 'Urban Echo',
      imageUrl: '/cover-images/7.jpg',
      audioUrl: '/songs/7.mp3',
      duration: 39,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Desert Wind',
      artist: 'Sahara Sons',
      imageUrl: '/cover-images/8.jpg',
      audioUrl: '/songs/8.mp3',
      duration: 28,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Ocean Waves',
      artist: 'Coastal Drift',
      imageUrl: '/cover-images/9.jpg',
      audioUrl: '/songs/9.mp3',
      duration: 28,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Starlight',
      artist: 'Luna Bay',
      imageUrl: '/cover-images/10.jpg',
      audioUrl: '/songs/10.mp3',
      duration: 30,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Winter Dreams',
      artist: 'Arctic Pulse',
      imageUrl: '/cover-images/11.jpg',
      audioUrl: '/songs/11.mp3',
      duration: 29,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Purple Sunset',
      artist: 'Dream Valley',
      imageUrl: '/cover-images/12.jpg',
      audioUrl: '/songs/12.mp3',
      duration: 17,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Neon Dreams',
      artist: 'Cyber Pulse',
      imageUrl: '/cover-images/13.jpg',
      audioUrl: '/songs/13.mp3',
      duration: 39,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Moonlight Dance',
      artist: 'Silver Shadows',
      imageUrl: '/cover-images/14.jpg',
      audioUrl: '/songs/14.mp3',
      duration: 27,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Urban Jungle',
      artist: 'City Lights',
      imageUrl: '/cover-images/15.jpg',
      audioUrl: '/songs/15.mp3',
      duration: 36,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Crystal Rain',
      artist: 'Echo Valley',
      imageUrl: '/cover-images/16.jpg',
      audioUrl: '/songs/16.mp3',
      duration: 39,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Neon Tokyo',
      artist: 'Future Pulse',
      imageUrl: '/cover-images/17.jpg',
      audioUrl: '/songs/17.mp3',
      duration: 39,
      plays: Math.floor(Math.random() * 5000),
    },
    {
      title: 'Midnight Blues',
      artist: 'Jazz Cats',
      imageUrl: '/cover-images/18.jpg',
      audioUrl: '/songs/18.mp3',
      duration: 29,
      plays: Math.floor(Math.random() * 5000),
    },
  ];

  async seed() {
    try {
      console.log('Seeding songs...');
      await this.songModel.deleteMany({});
      await this.songModel.insertMany(this.songs);
      console.log('✅ Songs seeded successfully');
    } catch (error) {
      console.error('❌ Song seeding failed:', error);
      throw error;
    }
  }
}
