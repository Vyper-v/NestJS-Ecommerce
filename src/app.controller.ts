import { JwtAuthGuard } from './auth/guards/jwt.guard';
import {
  Controller,
  Get,
  Next,
  Redirect,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { NextFunction, Request } from 'express';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

@Controller()
export class AppController {
  @Get()
  @Public()
  @Render('pages/index')
  getLogin() {
    return { title: 'Authentication' };
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  @Redirect('/', 301)
  logout(@Req() req: Request, @Next() next: NextFunction) {
    req.logout((err) => !!err && next(err));
  }
}
