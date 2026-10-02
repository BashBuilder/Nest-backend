import { NestFactory } from '@nestjs/core';
import { NotificationsServiceModule } from './notifications-service.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENT_ID } from '@app/kafka';
import { SERVICES_PORTS } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsServiceModule);

  // connect kafka microservice for consuming messages
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `${KAFKA_CLIENT_ID}-notifications`,
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notifications-service-group',
      },
    },
  });

  // start microservice
  await app.startAllMicroservices();
  await app.listen(SERVICES_PORTS.NOTIFICATION_SERVICE);

  console.log(
    'Notifications service is running on port',
    SERVICES_PORTS.NOTIFICATION_SERVICE,
  );
}
await bootstrap();
