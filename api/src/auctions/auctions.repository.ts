import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Auction } from './entities/auction.entity';
import { IAuctionRepository } from './interfaces/auctions.repository.interface';

@Injectable()
export class AuctionRepository implements IAuctionRepository {
  constructor(
    @InjectRepository(Auction) private readonly repo: Repository<Auction>,
  ) {}

  create(auction: DeepPartial<Auction>): Auction {
    return this.repo.create(auction);
  }

  async save(auction: Auction): Promise<Auction> {
    return await this.repo.save(auction);
  }
}
