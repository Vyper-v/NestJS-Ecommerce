import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: encodeURI(configService.get<string>('database.uri')),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    CartsModule,
    UsersModule,
    OrdersModule,
    MessagesModule,
    AuthModule,
  ],
})
export class AppModule {}
