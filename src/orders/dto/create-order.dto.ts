import { Item } from 'src/carts/schemas/cart.schema';

export class CreateOrderDto {
  email: string;
  orderId: number;
  state: string;
  items: Item[];
}
