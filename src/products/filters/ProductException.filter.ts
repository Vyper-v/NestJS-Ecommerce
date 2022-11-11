import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ProductNotFoundException } from '../exceptions/ProductNotFound.exception';

@Catch(ProductNotFoundException)
export class ProductExceptionFilter implements ExceptionFilter {
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
