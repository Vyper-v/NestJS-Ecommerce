import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller('app')
export class AppController {
  @Get('login')
  @Public()
  @Render('pages/auth/login')
  getLogin() {
    return { title: 'Login' };
  }

  @Get('signup')
  @Public()
  @Render('pages/auth/signup')
  getSignup() {
    return { title: 'Signup' };
  }

  @Get('logout')
  @Public()
  @Redirect('/', 301)
  logout() {
    return { message: 'You have been logged out' };
  }
}
