import { HttpException } from '@nestjs/common';

export class InvalidObjectId extends HttpException {
  constructor(id: string) {
    super(`Invalid ObjectId: ${id}`, 400);
  }
}
