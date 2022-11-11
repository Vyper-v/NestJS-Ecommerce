import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Redirect,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NextFunction, Request } from 'express';
import { AuthFilter } from './filters/Auth.filter';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PasswordNotMatchException } from './exceptions/PasswordNotMatch.exception';

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
  async postSignup(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new PasswordNotMatchException();
    }
    delete createUserDto.confirmPassword;
    return this.authService.registerUser(createUserDto);
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
