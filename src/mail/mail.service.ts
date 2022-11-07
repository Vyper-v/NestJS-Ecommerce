import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async sendEmailWithTemplate(
    to: string,
    subject: string,
    template: string,
    context: any,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
