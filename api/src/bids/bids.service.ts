import { Inject, Injectable } from '@nestjs/common';
import { IBidRepository } from './interfaces/bid.repository.interface';
import { PlaceBid } from 'src/kafka/dto/place-bid.dto';
import { DeepPartial } from 'typeorm';
import { Bid } from './entities/bid.entity';

@Injectable()
export class BidService {
  constructor(
    @Inject('IBidRepository')
    private readonly bidRepository: IBidRepository,
  ) {}

  async createBid(placeBid: PlaceBid) {
    const bid = this.bidRepository.create({
      price: placeBid.price,
      createdAt: new Date(),
      auction: { id: placeBid.auctionId },
      buyer: { id: placeBid.user },
    } as DeepPartial<Bid>);
    await this.bidRepository.save(bid);
    console.log('BID CREATED: ', bid);
  }
}
