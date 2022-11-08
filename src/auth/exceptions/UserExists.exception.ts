import { NotAcceptableException } from '@nestjs/common';

export class UserExistsException extends NotAcceptableException {
  constructor() {
    super('User already exists');
  }
}
