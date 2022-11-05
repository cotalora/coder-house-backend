const { producto } = require("../dataProducts");

class ProductController {
    constructor() { }

    products = async (req, res) => {
        const products = await producto.getAll();
        res.json(products);
    };

    product = async (req, res) => {
        const product = await producto.getById(parseInt(req.params.id));
        Object.keys(product).length > 0 ? res.json(product) : res.status(404).json({ error: 'Item not found' });
    };

    addProduct = async ({ body }, res) => {
        const newProduct = await producto.save(body);
        Object.keys(newProduct).length > 0 ?
            res.json({ message: 'Product has been added', data: newProduct }) :
            res.status(400).json({ error: 'Item not created' });
    };

    updateProduct = async (req, res) => {
        const result = await producto.updateById(parseInt(req.params.id), req.body);
        Object.keys(result).length > 0 ?
            res.json({ message: 'Product has been updated', data: result }) :
            res.status(404).json({ error: 'Item not found' });
    };

    deleteProduct = async (req, res) => {
        const result = await producto.deleteById(parseInt(req.params.id));
        result.length > 0 ? res.json({ message: 'Product has been deleted' }) : res.status(404).json({ error: 'Item not found' });
    };
}

const productController = new ProductController();

module.exports = { productController }