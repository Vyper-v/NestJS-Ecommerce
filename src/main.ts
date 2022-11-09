import helmet from 'helmet';
import flash = require('connect-flash');
import * as morgan from 'morgan';
import * as session from 'express-session';
import * as passport from 'passport';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PageNotFoundExceptionFilter } from './filters/PageNotFound.filter';
import { winstonInstance } from './winston.instance';
import { MongooseCastErrorFilter } from './filters/mongoose/cast.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance: winstonInstance }),
    cors: {
      origin: '*',
    },
  });
  const config = app.get(ConfigService);
  const logger = new Logger('Requests');

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ecommerce API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
    }),
  );
  app.useGlobalFilters(
    new PageNotFoundExceptionFilter(),
    new MongooseCastErrorFilter(),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');
  app.use(
    session({
      secret: config.get<string>('session.secret'),
      resave: config.get<boolean>('session.resave'),
      saveUninitialized: config.get<boolean>('session.saveUninitialized'),
      cookie: {
        maxAge: config.get<number>('session.cookie.maxAge'),
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(helmet(config.get('helmet')));

  if (config.get<string>('NODE_ENV') !== 'production') {
    app.use(
      morgan('combined', {
        stream: {
          write: (message) => {
            logger.log(message);
          },
        },
      }),
    );
  }

  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get<number>('port'), async () => {
    console.log(`Server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
