import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    UsersModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
