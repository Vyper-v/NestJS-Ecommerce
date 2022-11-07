import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Redirect('/products', 301)
  postLogin() {
    return { message: 'Logged succesfully' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('token')
  async getToken(@Request() req) {
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
      image: image.originalname,
    });

    return access;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
