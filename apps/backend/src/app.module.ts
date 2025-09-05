import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import { SongModule } from './song/song.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { StatModule } from './stat/stat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SocketGateway } from './socket/socket.gateway';
import { Song, SongSchema } from './song/entities/song.entity';
import { Album, AlbumSchema } from './album/entities/album.entity';
import { SongSeedService } from './seeds/song-seed.service';
import { SeedService } from './seeds/seed.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.MONGODB_DB_NAME || 'spotify_clone ',
      }),
    }),
    MongooseModule.forFeature([
      { name: Song.name, schema: SongSchema },
      { name: Album.name, schema: AlbumSchema },
    ]),
    AlbumModule,
    AuthModule,
    SongModule,
    UserModule,
    AdminModule,
    StatModule,
    MessageModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway, SongSeedService, SeedService],
})
export class AppModule {}
