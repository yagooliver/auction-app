import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from './interfaces/products.repository.interface';
import { CreateProduct } from './dtos/create-product.dto';
import { Product } from './entities/products.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async createProduct(createProduct: CreateProduct): Promise<Product> {
    console.log('Creating product');

    const product = this.productRepository.create({
      name: createProduct.name,
      price: createProduct.price,
      description: createProduct.description,
      pictures: createProduct.pictures.map((uri) => ({ uri })),
    } as DeepPartial<Product>);

    return await this.productRepository.save(product);
  }
}
