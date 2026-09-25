import { Module } from '@nestjs/common';
import { EventsServiceController } from './events-service.controller.js';
import { EventsServiceService } from './events-service.service.js';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [KafkaModule.register('event-service-group'), DatabaseModule],
  controllers: [EventsServiceController],
  providers: [EventsServiceService],
})
export class EventsServiceModule {}
