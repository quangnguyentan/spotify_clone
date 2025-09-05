import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  collection: 'songs',
  timestamps: true,
  versionKey: false,
})
export class Song extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  artist: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String })
  audioUrl: string;

  @Prop({ required: true, type: Number })
  duration: number;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'Album' })
  albumId: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
