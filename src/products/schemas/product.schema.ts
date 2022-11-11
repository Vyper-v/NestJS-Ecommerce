import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  category: string;
  discount: number;
}

@Schema()
export class Product implements IProduct {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  image?: string;
  @Prop()
  stock: number;
  @Prop()
  category: string;
  @Prop()
  discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
