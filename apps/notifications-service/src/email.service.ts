import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  async onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '1025', 10),
      secure: false,
    });

    this.logger.log('Email service is running');
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: '"EventFlow" <noreply@eventflow.app>',
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error}`);
    }
  }
}
