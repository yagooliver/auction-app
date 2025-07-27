import { DeepPartial } from 'typeorm';
import { Auction } from '../entities/auction.entity';

export interface IAuctionRepository {
  create(auction: DeepPartial<Auction>): Auction;
  save(auction: Auction): Promise<Auction>;
}
