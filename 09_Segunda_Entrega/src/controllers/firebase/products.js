const { createProduct, getProducts, getProduct, updateById, deleteById } = require("../../daos/firebase/products");

class ProductController {
    constructor() { }

    async addProduct({ body }, res) {
        const newProduct = await createProduct(body);
        newProduct ?
            res.json({id: newProduct.id, ...body}) :
            res.status(400).json({ error: 'Item not created' });
    };

    async products (req, res) {
        const products = await getProducts();
        res.json(products?.map(product => {
            return {
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                foto: product.foto,
                precio: product.precio.$numberDecimal,
                stock: product.stock,
                id: product.id,
            }
        }));
    };

    async product (req, res) {
        const product = await getProduct(req.params.id);
        product ? res.json({
            nombre: product.nombre,
            descripcion: product.descripcion,
            codigo: product.codigo,
            foto: product.foto,
            precio: product.precio,
            stock: product.stock,
            _id: product._id,
        }) : res.status(404).json({ error: 'Item not found' });
    };

    async updateProduct (req, res) {
        const result = await updateById(req.params.id, req.body);
        result ?
            res.json({ message: 'Product has been updated', data: req.body }) :
            res.status(404).json({ error: 'Item not found' });
    };

    async deleteProduct (req, res) {
        const result = await deleteById(req.params.id);
        result ? res.json({ message: 'Product has been deleted' }) : res.status(404).json({ error: 'Item not found' });
    }
}

const productController = new ProductController();

module.exports = { productController }