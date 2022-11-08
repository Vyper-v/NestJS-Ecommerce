import { Response } from 'express';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  getLogin(@Req() req, @Res() res: Response) {
    res.render('pages/index', {
      messages: req.flash('authError'),
    });
  }
}
