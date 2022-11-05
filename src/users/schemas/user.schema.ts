import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({})
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'user' })
  role: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  image: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop({ required: true })
  birthday: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
