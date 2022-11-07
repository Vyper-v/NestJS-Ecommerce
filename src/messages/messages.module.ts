import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MessageSchema } from './schemas/message.schema';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessagesGateway, MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
