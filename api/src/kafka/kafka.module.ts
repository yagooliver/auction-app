import { forwardRef, Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka.service';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';
import { KafkaConfig } from 'src/config/kafka.config';
import { BidModule } from 'src/bids/bids.module';

@Module({
  imports: [
    ClientsModule.register(KafkaConfig.getKafkaProducerConfig()),
    forwardRef(() => BidModule),
  ],
  providers: [KafkaController, KafkaProducerService],
  exports: [KafkaProducerService],
  controllers: [KafkaController],
})
export class KafkaModule {}
