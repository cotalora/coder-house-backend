import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from '../../servicers/products/products.service';
import { ProductDocument } from 'src/dtos/products/product.schema';
import { CreateProductDto } from 'src/dtos/products/register-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get('/')
    getAllProducts(): Promise<ProductDocument[]> {
        return this.productsService.getAllProducts();
    }

    @Post('/')
    registerProduct(@Body() product: CreateProductDto): Promise<ProductDocument> {
        return this.productsService.createProduct(product);
    }
}
