import { Module } from '@nestjs/common';
import { TicketsServiceController } from './tickets-service.controller.js';
import { TicketsServiceService } from './tickets-service.service.js';

@Module({
  imports: [],
  controllers: [TicketsServiceController],
  providers: [TicketsServiceService],
})
export class TicketsServiceModule {}
