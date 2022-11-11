import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { MulterModule } from '@nestjs/platform-express';

import { createStorage } from './multer/storage';
import { imageFilter } from './multer/imageFilter';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('auth.jwt'),
      inject: [ConfigService],
    }),
    MulterModule.register({
      storage: createStorage('users'),
      fileFilter: imageFilter,
    }),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, SessionSerializer],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
