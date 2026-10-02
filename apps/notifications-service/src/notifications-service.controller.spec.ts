import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsServiceController } from './notifications-service.controller.js';
import { NotificationsServiceService } from './notifications-service.service.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('NotificationsServiceController', () => {
  let notificationsServiceController: NotificationsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsServiceController],
      providers: [NotificationsServiceService],
    }).compile();

    notificationsServiceController = app.get<NotificationsServiceController>(
      NotificationsServiceController,
    );
  });
});
