import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'messages',
  timestamps: true,
  versionKey: false,
})
export class Message extends Document {
  @Prop({ required: true, type: String })
  senderId: string;

  @Prop({ required: true, type: String })
  receiverId: string;

  @Prop({ required: true, type: String })
  content: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
