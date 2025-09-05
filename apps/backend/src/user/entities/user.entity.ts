import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String, unique: true })
  clerkId: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
