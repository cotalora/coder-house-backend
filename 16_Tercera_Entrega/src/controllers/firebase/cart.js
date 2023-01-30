const { createCart, deleteById, getProductsByIdCart, addProductToCart } = require("../../daos/firebase/carts");

class CartController {
    constructor() { }

    async addCart ({ body }, res) {
        const newCart = await createCart(body);
        
        newCart ?
            res.json({ message: 'Cart has been added', data: newCart }) :
            res.status(400).json({ error: 'Item not created' });
    };
    
    async deleteCart (req, res) {
        const result = await deleteById(req.params.id);
        result ? 
            res.json({ message: 'Cart has been deleted' }) : 
            res.status(404).json({ error: 'Item not found' });
    };
    
    async productsOnCart (req, res) {
        const products = await getProductsByIdCart(req.params.id);

        products?.length > 0 ?
            res.json({ products }) : 
            res.status(404).json({ error: 'Not found' });
    };
    
    async addProductToCart (req, res) {
        const newProducts = await addProductToCart(req.params.id, req.body);
        newProducts?.products?.length > 0 ?
            res.json({ message: 'Products has been added', data: newProducts }) :
            res.status(404).json({ error: 'Item not added' });
    };
}

const cartController = new CartController();

module.exports = { cartController }