import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messageModel.create(createMessageDto);
  }

  findAll(filter: FilterQuery<MessageDocument> = {}) {
    return this.messageModel.find(filter);
  }
}
