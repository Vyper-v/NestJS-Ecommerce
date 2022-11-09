import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';

@Catch(MongooseError.CastError)
export class MongooseCastErrorFilter implements ExceptionFilter {
  catch(exception: MongooseError.CastError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(400).json({
      statusCode: 400,
      message: exception.message,
      path: request.url,
    });
  }
}
