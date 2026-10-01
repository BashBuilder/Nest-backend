import { Module } from '@nestjs/common';
import { TicketsServiceController } from './tickets-service.controller.js';
import { TicketsServiceService } from './tickets-service.service.js';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [KafkaModule.register('tickets-service-group'), DatabaseModule],
  controllers: [TicketsServiceController],
  providers: [TicketsServiceService],
})
export class TicketsServiceModule {}
