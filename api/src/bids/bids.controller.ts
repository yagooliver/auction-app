import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { PlaceBidRequest } from './dto/place-bid.dto';
import { KafkaProducerService } from 'src/kafka/kafka.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('bids')
export class BidController {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  @UseGuards(AuthGuard)
  @Post()
  async placeBid(@Body() request: PlaceBidRequest, @Res() res: Response) {
    console.log('Calling API PlaceBid', request);
    await this.kafkaProducer.sendMessage('place.bid', {
      auctionId: request.auctionId,
      price: request.price,
      user: request.user,
    });
    return res.status(201).json({ message: 'Bid placed' });
  }
}
