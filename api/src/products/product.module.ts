import { Module } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductRepository,
    {
      provide: 'IProductRepository',
      useExisting: ProductRepository,
    },
    ProductService,
  ],
  exports: ['IProductRepository', TypeOrmModule, ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
