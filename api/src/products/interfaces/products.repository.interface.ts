import { DeepPartial } from 'typeorm';
import { Product } from '../entities/products.entity';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  create(product: DeepPartial<Product>): Product;
  save(product: Product): Promise<Product>;
}
