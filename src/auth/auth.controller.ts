import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Request,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  postLogin(@Request() req, @Session() session) {
    this.authService.login(req.user);
  }

  @Render('pages/auth/login')
  @Get('login')
  getLogin() {
    return { title: 'Login' };
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(ClassSerializerInterceptor)
  async postSignup(@Body() payload, @UploadedFile() image) {
    try {
      const user = await this.usersService.create({
        ...payload,
        image: image.filename,
      });
      return new UserEntity(user);
    } catch (error) {
      return { message: error.message };
    }
  }

  @Render('pages/auth/signup')
  @Get('signup')
  getSignup() {
    return { title: 'Signup' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @Redirect('/', 301)
  logout() {
    return { message: 'You have been logged out' };
  }
}
