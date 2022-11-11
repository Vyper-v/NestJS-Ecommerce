import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { CartNotFoundException } from '../exceptions/CartNotFound.exception';

@Catch(CartNotFoundException)
export class CartExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: any) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
