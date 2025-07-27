import { DeepPartial } from 'typeorm';
import { Bid } from '../entities/bid.entity';

export interface IBidRepository {
  create(bid: DeepPartial<Bid>): Bid;
  save(bid: Bid): Promise<Bid>;
}
