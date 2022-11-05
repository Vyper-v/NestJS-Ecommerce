import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  postLogin(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  async postSignup(
    @Body() payload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const access = await this.authService.registerUser({
      ...payload,
      image: image.filename,
    });
    return access;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
