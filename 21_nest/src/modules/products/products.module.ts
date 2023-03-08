import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ProductsController } from 'src/controllers/products/products.controller';
import { ProductsService } from 'src/servicers/products/products.service';
import { ProductCollectionName, ProductSchema } from '../../dtos/products/product.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: ProductCollectionName, schema: ProductSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
