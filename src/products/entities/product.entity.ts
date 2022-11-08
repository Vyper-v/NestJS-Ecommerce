import { Expose, Transform } from 'class-transformer';

export class Product {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
