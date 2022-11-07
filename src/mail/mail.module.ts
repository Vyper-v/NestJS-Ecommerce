import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigService } from '@nestjs/config';
import { cwd } from 'process';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: configService.get('nodemailer.user'),
            pass: configService.get('nodemailer.pass'),
          },
        },
        defaults: {
          from: `useSpices <${configService.get('nodemailer.user')}>`,
        },
        template: {
          dir: join(cwd(), 'views/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
