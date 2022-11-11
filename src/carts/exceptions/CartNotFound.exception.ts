import { NotFoundException } from '@nestjs/common';

export class CartNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Cart with id ${id} not found`);
  }
}
