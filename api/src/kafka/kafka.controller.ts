import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';
import { Controller, forwardRef, Inject } from '@nestjs/common';
import { PlaceBid } from './dto/place-bid.dto';
import { BidService } from 'src/bids/bids.service';

@Controller()
export class KafkaController {
  constructor(
    @Inject(forwardRef(() => BidService))
    private readonly bidService: BidService,
  ) {}

  @MessagePattern('place.bid')
  async placeBid(@Payload() message: PlaceBid, @Ctx() context: KafkaContext) {
    console.log(message);
    console.log('Message received from kafka');
    console.log('Price: ', message.price);
    console.log('User: ', message.user);
    console.log('Create at: ', new Date().toDateString());
    await this.bidService.createBid(message);
  }
}
