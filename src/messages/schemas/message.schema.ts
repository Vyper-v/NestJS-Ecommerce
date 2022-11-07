import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  text: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
