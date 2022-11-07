import { AuthenticatedGuard } from './../auth/guards/authenticated.guard';
import { Controller, Get, Param, Render, Res, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Response } from 'express';

@Controller('chat')
@UseGuards(AuthenticatedGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':email')
  async getMessages(@Res() res: Response, @Param('email') email: string) {
    res.render('pages/chat/user-messages', {
      title: `Chat with ${email}`,
      messages: await this.messagesService.findAll({ email }),
    });
  }

  @Get()
  @Render('pages/chat/room')
  getChat() {
    return { title: 'Chat' };
  }
}
