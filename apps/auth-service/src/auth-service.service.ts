import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    //connect to kafka when the module initializes
    await this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async simulateUserRegistration(email: string) {
    // publish event to kafka
    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
      email,
      timestamp: new Date().toISOString(),
    });

    return {
      message: `User registration event for ${email} has been published to Kafka.`,
    };
  }
}
