import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  collection: 'albums',
  timestamps: true,
  versionKey: false,
})
export class Album extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  artist: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  releaseYear: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'songs' })
  song: string[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
