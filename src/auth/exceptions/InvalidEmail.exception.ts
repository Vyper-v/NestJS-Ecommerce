import { NotAcceptableException } from '@nestjs/common';

export class InvaliEmailException extends NotAcceptableException {
  constructor() {
    super('Invalid email');
  }
}
