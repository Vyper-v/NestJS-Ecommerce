import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, ref: 'Product' })
  productId: string;

  @Prop({ required: true })
  quantity: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: [ItemSchema], default: [] })
  products: Item[];

  @Prop({ required: true })
  address: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
