import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Product with id ${id} not found`);
  }
}
