import { Module } from '@nestjs/common';
import { NotificationsServiceController } from './notifications-service.controller.js';
import { NotificationsServiceService } from './notifications-service.service.js';
import { EmailService } from './email.service.js';

@Module({
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService, EmailService],
})
export class NotificationsServiceModule {}
