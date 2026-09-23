import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKER,
  KAFKA_CLIENT_ID,
  KAFKA_CONSUMER_GROUP,
} from './constants.ts/kafka.constant.js';

export const KAFKA_SERVICE = 'KAFKA_SERVICE';

@Module({
  // providers: [KafkaService],
  // exports: [KafkaService],
})
export class KafkaModule {
  static register(consumerGroup?: string) {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: KAFKA_CLIENT_ID,
                brokers: [KAFKA_BROKER],
              },
              consumer: {
                groupId: consumerGroup ?? KAFKA_CONSUMER_GROUP,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
