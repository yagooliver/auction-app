import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user.enum';
import { Auction } from 'src/auctions/entities/auction.entity';
import { Bid } from 'src/bids/entities/bid.entity';

@Entity('users')
export class User {
  /**
   *
   */
  constructor(email: string, name: string, password: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Auction, (auction) => auction.owner)
  auctions: Auction[];

  @OneToMany(() => Bid, (bid) => bid.buyer)
  bids: Bid[];
}
