import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Auction } from 'src/auctions/entities/auction.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Auction, (auction) => auction.bids)
  auction: Auction;

  @ManyToOne(() => User, (user) => user.bids)
  buyer: User;
}
