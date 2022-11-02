import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
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
    }),
  );
  SwaggerModule.setup('docs', app, document);
  await app.listen(config.get<number>('port'), async () => {
    console.log(`Server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
