import { Auction } from 'src/auctions/entities/auction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Picture } from './pictures.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Picture, (picture) => picture.product, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Auction, (auction) => auction.product, { nullable: true })
  auction: Auction | null;
}
