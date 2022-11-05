import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ ref: 'User' })
  email: string;
  @Prop()
  message: string;
  @Prop({
    default: Date.now,
  })
  date: Date;
  @Prop()
  type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
