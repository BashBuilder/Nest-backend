import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service.js';

@Injectable()
export class NotificationsServiceService {
  private readonly logger = new Logger(NotificationsServiceService.name);

  constructor(private readonly emailService: EmailService) {}

  async sendWelcomeEmail(data: {
    userId: string;
    email: string;
    name: string;
  }) {
    this.logger.log(`Sending welcome email to ${data.email}`);

    const html = `
      <h1>Welcome to EventFlow!</h1>
      <p>Hi ${data.name},</p>
      <p>YOu can now explore and purchase tickets for your favorite events using EventFlow.</p>
      <p>We are excited to have you on board and hope you enjoy the experience!</p>
      <p>Best regards,</p>
      <p>The EventFlow Team</p>
      <br/>
      <p>If you have any questions or need assistance, feel free to reach out to our support team at
      <p>Thank you for choosing EventFlow!</p>
    `;
    await this.emailService.sendEmail(data.email, 'Welcome to EventFlow', html);
  }

  async sendTicketPurchaseConfirmationEmail(data: {
    userId: string;
    email: string;
    ticketCode: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
    totalPrice: number;
  }) {
    this.logger.log(
      `Sending ticket purchase confirmation email to ${data.email}`,
    );
    const html = `
      <h1>Ticket Purchase Confirmation</h1>
      <p>Hi ${data.userId},</p>
      <p>Thank you for purchasing a ticket for the event "${data.eventTitle}" on ${data.eventDate} at ${data.eventLocation}. Your ticket code is ${data.ticketCode}.</p>
      <p>Your total price is ${data.totalPrice}.</p>
      <p>We hope you enjoy your event and have a great time at the event.</p>
      <p>Best regards,</p>
      <p>The EventFlow Team</p>
    `;
    await this.emailService.sendEmail(
      data.email,
      'Ticket Purchase Confirmation',
      html,
    );
  }

  async sendEventCancelledEmail(data: {
    organizerId: string;
    email: string;
    eventTitle: string;
    eventDate: string;
    eventLocation: string;
  }) {
    this.logger.log(`Sending event cancelled email to ${data.email}`);
    const html = `
      <h1>Event Cancelled</h1>
      <p>Hi ${data.organizerId},</p>
      <p>The event "${data.eventTitle}" on ${data.eventDate} at ${data.eventLocation} has been cancelled.</p>
      <p>We hope you enjoyed the event and have a great time at the event.</p>
      <p>Best regards,</p>
      <p>The EventFlow Team</p>
    `;
    await this.emailService.sendEmail(data.email, 'Event Cancelled', html);
  }
}
