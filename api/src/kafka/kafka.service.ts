import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    console.log('Calling onModuleInit');
    this.kafkaClient.subscribeToResponseOf('place.bid');
    await this.kafkaClient.connect();
  }

  async sendMessage(topic: string, message: any) {
    try {
      console.log('📤 Message:', message);
      console.log('Type:', typeof message);
      console.log('Keys:', Object.keys(message));
      console.log('Producing to Kafka:', topic);
      await firstValueFrom(this.kafkaClient.emit(topic, message));
      console.log('Kafka message sent');
    } catch (error) {
      console.error('Kafka emit failed:', error);
    }
  }
}
