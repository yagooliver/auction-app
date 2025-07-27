import { KafkaModule } from 'src/kafka/kafka.module';
import { forwardRef, Module } from '@nestjs/common';
import { BidController } from './bids.controller';
import { BidService } from './bids.service';
import { Bid } from './entities/bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidRepostory } from './bids.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => KafkaModule),
    TypeOrmModule.forFeature([Bid]),
    AuthModule,
  ],
  providers: [
    BidRepostory,
    {
      provide: 'IBidRepository',
      useExisting: BidRepostory,
    },
    BidService,
  ],
  exports: [BidService],
  controllers: [BidController],
})
export class BidModule {}
