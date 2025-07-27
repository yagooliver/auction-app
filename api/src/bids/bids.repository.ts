import { InjectRepository } from '@nestjs/typeorm';
import { IBidRepository } from './interfaces/bid.repository.interface';
import { DeepPartial, Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BidRepostory implements IBidRepository {
  constructor(@InjectRepository(Bid) private readonly repo: Repository<Bid>) {}

  async save(bid: Bid): Promise<Bid> {
    return await this.repo.save(bid);
  }

  create(bid: DeepPartial<Bid>): Bid {
    return this.repo.create(bid);
  }
}
