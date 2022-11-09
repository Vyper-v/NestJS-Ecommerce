import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/carts/schemas/cart.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    default: 0,
  })
  orderId: number;

  @Prop({
    default: 'generated',
  })
  state: string;

  @Prop({
    required: true,
    ref: 'Item',
    type: [ItemSchema],
  })
  items: Item[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
