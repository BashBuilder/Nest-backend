import { Test, TestingModule } from '@nestjs/testing';
import { EventsServiceController } from './events-service.controller.js';
import { EventsServiceService } from './events-service.service.js';

describe('EventsServiceController', () => {
  let eventsServiceController: EventsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EventsServiceController],
      providers: [EventsServiceService],
    }).compile();

    eventsServiceController = app.get<EventsServiceController>(EventsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(eventsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
