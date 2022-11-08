import { NotAcceptableException } from '@nestjs/common';

export class PasswordNotMatchException extends NotAcceptableException {
  constructor() {
    super('Passwords do not match');
  }
}
