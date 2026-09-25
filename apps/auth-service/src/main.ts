import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module.js';
import { SERVICES_PORTS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  // Enable validation

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(SERVICES_PORTS.AUTH_SERVICE);
  console.log('Auth service is running on port', SERVICES_PORTS.AUTH_SERVICE);
  // await app.listen(3000);
  // console.log('Auth service is running on port', 3000);
}
await bootstrap();
