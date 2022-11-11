import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { CartSchema } from './schemas/cart.schema';
import { OrderSchema } from './schemas/order.schema';
import { ItemSchema } from './schemas/item.schema';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: 'Cart', useFactory: () => CartSchema },
      {
        name: 'Order',
        useFactory: (connection: Connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const AutoIncrement = require('mongoose-sequence')(connection);
          const schema = OrderSchema;
          schema.plugin(AutoIncrement, { inc_field: 'orderId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: 'Item',
        useFactory: () => ItemSchema,
      },
    ]),
    UsersModule,
    MailModule,
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
