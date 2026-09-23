import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller.js';
import { AuthServiceService } from './auth-service.service.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AuthServiceController', () => {
  let authServiceController: AuthServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [AuthServiceService],
    }).compile();

    authServiceController = app.get<AuthServiceController>(
      AuthServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authServiceController.getHello()).toBe('Hello World!');
    });
  });
});
