import {
  ArgumentsHost,
  Catch,
  NotFoundException,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class PageNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.render('pages/404', {
      title: request.url + ' not found',
      url: request.url,
    });
  }
}
