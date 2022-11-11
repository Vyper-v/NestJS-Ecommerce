import { Document, Schema } from 'mongoose';
import { IProduct } from 'src/products/schemas/product.schema';
import { ItemSchema } from './item.schema';

export interface IOrder {
  email: string;
  address: string;
  orderID?: number;
  state: string;
  products: {
    product: IProduct;
    quantity: number;
  };
}

export const OrderSchema = new Schema<IOrder>(
  {
    email: String,
    address: String,
    state: {
      type: String,
      enum: ['generated', 'paid', 'shipped', 'delivered'],
      default: 'generated',
    },
    products: [ItemSchema],
  },
  { timestamps: true },
);

export type OrderDocument = Document & IOrder;
