import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { MulterModule } from '@nestjs/platform-express';

import { UserStorage } from './multer/storage';
import { imageFilter } from './multer/imageFilter';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt.secret'),
        signOptions: { expiresIn: '15min' },
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: UserStorage,
        fileFilter: imageFilter,
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
