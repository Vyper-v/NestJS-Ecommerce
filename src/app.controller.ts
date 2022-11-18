import { cpus, totalmem } from 'node:os';
import { Response } from 'express';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './enums/roles.enum';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}
  @Get()
  getLogin(@Req() req, @Res() res: Response) {
    res.render('pages/index', {
      messages: req.flash('loginError'),
    });
  }

  @UseGuards(AuthenticatedGuard, JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('info')
  getServerInfo(@Res() res: Response) {
    res.render('pages/info', {
      title: 'Server Info',
      cpus: cpus().length,
      memory: totalmem() / 2 ** 20,
      env: process.env.NODE_ENV,
      port: this.configService.get<number>('port'),
      nodeVersion: process.version,
    });
  }
}
