import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationsServiceService } from './notifications-service.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@app/kafka';

@Controller()
export class NotificationsServiceController {
  private readonly logger = new Logger(NotificationsServiceController.name);

  constructor(
    private readonly notificationsServiceService: NotificationsServiceService,
  ) {}

  @Get('health')
  healthCheck() {
    this.logger.log('Health check');
    return { status: 'ok' };
  }

  @EventPattern(KAFKA_TOPICS.TICKET_PURCHASED)
  async handleTicketPurchasedEvent(
    @Payload()
    data: any,
  ) {
    this.logger.log(`Handling ticket purchased event: ${JSON.stringify(data)}`);
    const { eventId, userId, quantity, totalPrice, ticketCode } = data;
    await this.notificationsServiceService.sendTicketPurchaseConfirmationEmail({
      userId,
      email: userId,
      ticketCode,
      eventTitle: eventId,
      eventDate: new Date(eventId).toDateString(),
      eventLocation: 'TBD',
      totalPrice,
    });
  }

  @EventPattern(KAFKA_TOPICS.EVENT_CANCELLED)
  async handleEventCancelledEvent(data: any) {
    this.logger.log(`Handling event cancelled event: ${JSON.stringify(data)}`);
    const { eventId, organizerId } = data;
    await this.notificationsServiceService.sendEventCancelledEmail({
      organizerId,
      email: organizerId,
      eventTitle: eventId,
      eventDate: new Date(eventId).toDateString(),
      eventLocation: 'TBD',
    });
  }

  @EventPattern(KAFKA_TOPICS.USER_REGISTERED)
  async handleUserRegisteredEvent(data: any) {
    this.logger.log(`Handling user registered event: ${JSON.stringify(data)}`);
    const { userId, email, name } = data;
    await this.notificationsServiceService.sendWelcomeEmail({
      userId,
      email,
      name,
    });
  }

  // @OnEvent(KAFKA_TOPICS.TICKET_PURCHASED)
  // async handleTicketPurchasedEvent(
  //   @Payload()
  //   data: any) {
  //   this.logger.log(`Handling ticket purchased event: ${JSON.stringify(data)}`);
  //   const { eventId, userId, quantity, totalPrice, ticketCode } = data;
  //   await this.notificationsServiceService.sendTicketPurchaseConfirmationEmail({
  //     userId,
  //     email: userId,
  //     ticketCode,
  //     eventTitle: eventId,
  //     eventDate: new Date(eventId).toDateString(),
  //     eventLocation: 'TBD',
  //     totalPrice,
  //   });
  // }

  // @OnEvent(KAFKA_TOPICS.EVENT_CANCELLED)
  // async handleEventCancelledEvent(data: any) {
  //   this.logger.log(`Handling event cancelled event: ${JSON.stringify(data)}`);
  //   const { eventId, organizerId } = data;
  //   await this.notificationsServiceService.sendEventCancelledEmail({
  //     organizerId,
  //     email: organizerId,
  //     eventTitle: eventId,
  //     eventDate: new Date(eventId).toDateString(),
  //     eventLocation: 'TBD',
  //   });
  // }
}
