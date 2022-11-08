import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Redirect,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NextFunction, Request } from 'express';
import { AuthFilter } from './filters/Auth.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseFilters(AuthFilter)
  @Redirect('/products', 301)
  postLogin() {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('token')
  async getToken(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @UseFilters(AuthFilter)
  @UseInterceptors(FileInterceptor('image'))
  async postSignup(
    @Body() payload,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const access = await this.authService.registerUser({
      ...payload,
      image: image?.originalname || '',
    });

    return access;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  @Redirect('/', 301)
  logout(@Req() req: Request, @Next() next: NextFunction) {
    req.logout((err) => !!err && next(err));
  }
}
