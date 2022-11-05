import { join } from 'path';
import * as passport from 'passport';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ecommerce API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  app.useGlobalPipes(new ValidationPipe());
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

  SwaggerModule.setup('docs', app, document);
  await app.listen(config.get<number>('port'), async () => {
    console.log(`Server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
