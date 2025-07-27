import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from './kafka/kafka.module';
import { BidModule } from './bids/bids.module';
import { DataSourceConfig } from './config/database.config';
import { AuctionModule } from './auctions/auctions.module';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig.getDatabaseConfig()),
    UsersModule,
    KafkaModule,
    BidModule,
    AuctionModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
