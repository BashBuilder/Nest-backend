import { NestFactory } from '@nestjs/core';
import { EventsServiceModule } from './events-service.module.js';
import { ValidationPipe } from '@nestjs/common';
import { SERVICES_PORTS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(EventsServiceModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(SERVICES_PORTS.EVENT_SERVICE);
}
await bootstrap();
