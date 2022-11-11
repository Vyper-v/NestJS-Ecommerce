import { Document, Schema } from 'mongoose';
import { IItem, ItemSchema } from './item.schema';

export interface ICart {
  email: string;
  address: string;
  products: IItem[];
}

export const CartSchema = new Schema<ICart>({
  email: String,
  address: String,
  products: {
    type: [ItemSchema],
    required: true,
  },
});

export type CartDocument = ICart & Document;
