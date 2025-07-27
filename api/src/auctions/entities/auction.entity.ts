import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Bid } from 'src/bids/entities/bid.entity';
import { Product } from 'src/products/entities/products.entity';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'decimal' })
  startingPrice: number;

  @Column({ type: 'timestamp' })
  endsAt: Date;

  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;

  @OneToMany(() => Bid, (bid) => bid.auction)
  bids: Bid[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'decimal' })
  highestBid: number;

  @OneToOne(() => Product, (product) => product.auction)
  @JoinColumn()
  product: Product;
}
