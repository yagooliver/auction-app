import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { IProductRepository } from './interfaces/products.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}

  findById(id: string): Promise<Product | null> {
    return this.repo.findOne({ where: { id: id } });
  }

  create(product: DeepPartial<Product>): Product {
    return this.repo.create(product);
  }

  async save(product: Product): Promise<Product> {
    return await this.repo.save(product);
  }
}
