import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { UserExistsException } from './exceptions/UserExists.exception';
import { PasswordNotMatchException } from './exceptions/PasswordNotMatch.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const exists = await this.usersService.findByEmail(createUserDto.email);

    if (exists) {
      throw new UserExistsException();
    }

    const user = await this.usersService.create(createUserDto);

    await this.mailService.sendEmailWithTemplate(
      user.email,
      'Welcome to useSpices',
      'welcome',
      { user: user.toObject() },
    );

    return this.login(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatches = await compare(password, user.password);

    if (user && passwordMatches) {
      return user.toObject();
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
