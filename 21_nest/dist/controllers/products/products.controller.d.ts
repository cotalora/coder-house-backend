import { ProductsService } from '../../servicers/products/products.service';
import { ProductDocument } from 'src/dtos/products/product.schema';
import { CreateProductDto } from 'src/dtos/products/register-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<ProductDocument[]>;
    registerProduct(product: CreateProductDto): Promise<ProductDocument>;
}
