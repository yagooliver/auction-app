import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { AuctionRepository } from './auctions.repository';
import { AuctionService } from './auctions.service';
import { AuctionController } from './auctions.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/products/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    UsersModule,
    ProductModule,
    AuthModule,
  ],
  providers: [
    AuctionRepository,
    {
      provide: 'IAuctionRepository',
      useExisting: AuctionRepository,
    },
    AuctionService,
  ],
  exports: [AuctionService],
  controllers: [AuctionController],
})
export class AuctionModule {}
