import { Schema, Types } from 'mongoose';

export interface IItem {
  product: Types.ObjectId;
  quantity: number;
}

export const ItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
  },
  { _id: false },
);
