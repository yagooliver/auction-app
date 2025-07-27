import { Injectable, Inject } from '@nestjs/common';
import { Auction } from './entities/auction.entity';
import { CreateAuctionDto } from './dtos/create-auction.dto';
import { IAuctionRepository } from './interfaces/auctions.repository.interface';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { IProductRepository } from 'src/products/interfaces/products.repository.interface';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuctionService {
  constructor(
    @Inject('IAuctionRepository')
    private readonly auctionRepository: IAuctionRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async createAuction(createAuction: CreateAuctionDto): Promise<Auction> {
    const product = await this.productRepository.findById(
      createAuction.productId,
    );
    if (!product) throw new Error('Product not found');

    const owner = await this.userRepository.findByUserId(createAuction.ownerId);
    if (!owner) throw new Error('User not found');

    const title = createAuction.title;
    const startingPrice = createAuction.startingPrice;
    const endsAt = createAuction.endsAt;
    const createdAt = new Date();
    const auction = this.auctionRepository.create({
      title,
      product,
      owner,
      startingPrice,
      createdAt,
      endsAt,
      highestBid: 0,
      bids: [],
    } as DeepPartial<Auction>);

    return await this.auctionRepository.save(auction);
  }
}
