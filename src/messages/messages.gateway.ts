import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto);
    client.broadcast.emit('messageCreated', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  // @SubscribeMessage('joinRoom')
  // joinRoom(@MessageBody() payload, @ConnectedSocket() client) {
  //   return this.messagesService.identifyUser(payload, client.id);
  // }
}
