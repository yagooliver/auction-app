import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export class KafkaConfig {
  static getKafkaProducerConfig(): ClientsModuleOptions {
    return [
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auction',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'bid-consumer',
          },
        },
      },
    ];
  }
}
