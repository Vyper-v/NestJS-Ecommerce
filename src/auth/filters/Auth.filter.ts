import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PasswordNotMatchException } from '../exceptions/PasswordNotMatch.exception';
import { UserExistsException } from '../exceptions/UserExists.exception';
import { UserNotFoundException } from '../exceptions/UserNotFound.exception';

@Catch()
export class AuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (
      [
        UserNotFoundException,
        PasswordNotMatchException,
        UserExistsException,
      ].some((except) => exception instanceof except)
    ) {
      request.flash('loginError', exception.message);
      return response.redirect('/');
    }
  }
}
