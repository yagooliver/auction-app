import { Product } from './products.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  uri: string;

  @ManyToOne(() => Product, (product) => product.pictures)
  product: Product;
}
