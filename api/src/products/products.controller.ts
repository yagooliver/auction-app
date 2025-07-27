import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CreateProduct } from './dtos/create-product.dto';
import { Response } from 'express';
import { ProductService } from './products.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('api/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProduct,
    @Res() res: Response,
  ) {
    const product = await this.service.createProduct(createProduct);

    return res.status(201).json({ message: 'Product created', id: product.id });
  }
}
