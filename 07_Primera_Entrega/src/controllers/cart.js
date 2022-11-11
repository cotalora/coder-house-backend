const { cart } = require("../dataCarts");

class CartController {
    constructor() { }

    async addCart ({ body }, res) {
        const newCart = await cart.save(body);
        Object.keys(newCart).length > 0 ?
            res.json({ message: 'Cart has been added', data: newCart }) :
            res.status(400).json({ error: 'Item not created' });
    };
    
    async deleteCart (req, res) {
        const result = await cart.deleteById(parseInt(req.params.id));
        result?.length > 0 ? 
            res.json({ message: 'Cart has been deleted' }) : 
            res.status(404).json({ error: 'Item not found' });
    };
    
    async productsOnCart (req, res) {
        const products = await cart.getProductsByIdCart(parseInt(req.params.id));
        products?.length > 0 ?
            res.json({ products }) : 
            res.status(404).json({ error: 'Not found' });
    };
    
    async addProductToCart (req, res) {
        const newProducts = await cart.addProductToCart(parseInt(req.params.id), req.body);
        newProducts?.length > 0 ?
            res.json({ message: 'Products has been added', data: newProducts }) :
            res.status(404).json({ error: 'Item not added' });
    };
    
    async deleteProductOnCart (req, res) {
        const result = await cart.deleteProductFromCart(parseInt(req.params.id), parseInt(req.params.id_prod));
        res.json({ message: 'Product has been deleted', data: result })
    };
}

const cartController = new CartController();

module.exports = { cartController }