import { Test, TestingModule } from '@nestjs/testing';
import { EventsServiceController } from './events-service.controller.js';
import { EventsServiceService } from './events-service.service.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('EventsServiceController', () => {
  let eventsServiceController: EventsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventsServiceController],
      providers: [EventsServiceService],
    }).compile();

    eventsServiceController = app.get<EventsServiceController>(
      EventsServiceController,
    );
  });
});
