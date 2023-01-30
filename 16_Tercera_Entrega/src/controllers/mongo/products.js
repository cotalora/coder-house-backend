const { initMongoDB, disconnetMongoDB } = require("../../daos/mongoDB/connection");
const { createProduct, getProducts, getProduct, updateById, deleteById } = require("../../daos/mongoDB/products");

class ProductController {
    constructor() { }

    async addProduct({ body }, res) {
        await initMongoDB();
        const newProduct = await createProduct(body);
        newProduct ?
            res.json({
                message: 'Product has been added', data: {
                    nombre: newProduct.nombre,
                    descripcion: newProduct.descripcion,
                    codigo: newProduct.codigo,
                    foto: newProduct.foto,
                    precio: newProduct.precio.$numberDecimal,
                    stock: newProduct.stock,
                    _id: newProduct._id,
                }
            }) :
            res.status(400).json({ error: 'Item not created' });
        await disconnetMongoDB();
    };

    async products (req, res) {
        await initMongoDB();
        const products = await getProducts();
        res.json(products?.map(product => {
            return {
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                foto: product.foto,
                precio: product.precio.$numberDecimal,
                stock: product.stock,
                _id: product._id,
            }
        }));
        await disconnetMongoDB();
    };

    async product (req, res) {
        await initMongoDB();
        const product = await getProduct(req.params.id);
        product ? res.json({
            nombre: product.nombre,
            descripcion: product.descripcion,
            codigo: product.codigo,
            foto: product.foto,
            precio: product.precio.$numberDecimal,
            stock: product.stock,
            _id: product._id,
        }) : res.status(404).json({ error: 'Item not found' });
        await disconnetMongoDB();
    };

    async updateProduct (req, res) {
        await initMongoDB();
        const result = await updateById(req.params.id, req.body);
        result ?
            res.json({ message: 'Product has been updated', data: req.body }) :
            res.status(404).json({ error: 'Item not found' });
        await disconnetMongoDB();
    };

    async deleteProduct (req, res) {
        await initMongoDB();
        const result = await deleteById(req.params.id);
        result ? res.json({ message: 'Product has been deleted' }) : res.status(404).json({ error: 'Item not found' });
        await disconnetMongoDB();
    }
}

const productController = new ProductController();

module.exports = { productController }