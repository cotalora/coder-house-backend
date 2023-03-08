import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { ProductDto } from 'src/dtos/products/product.dto';
import { ProductCollectionName, ProductDocument } from 'src/dtos/products/product.schema';
import { CreateProductDto } from 'src/dtos/products/register-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(ProductCollectionName) private readonly productModel: Model<ProductDocument>) { }

    async getAllProducts() {
        return await this.productModel.find();
    }
    
    async createProduct(product: CreateProductDto) {
        return await this.productModel.create(product);
    }
}
