import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller.js';
import { EventService } from './event.service.js';

@Module({
  imports: [HttpModule],
  controllers: [EventsController],
  providers: [EventService],
})
export class EventsModule {}
