const { createCart, deleteById, getProductsByIdCart, addProductToCart, deleteProductFromCart } = require("../../daos/mongoDB/carts");
const { initMongoDB, disconnetMongoDB } = require("../../daos/mongoDB/connection");

class CartController {
    constructor() { }

    async addCart ({ body }, res) {
        await initMongoDB();

        const newCart = await createCart(body);
        
        newCart ?
            res.json({ message: 'Cart has been added', data: newCart }) :
            res.status(400).json({ error: 'Item not created' });
        
        await disconnetMongoDB();
    };
    
    async deleteCart (req, res) {
        await initMongoDB();
        
        const result = await deleteById(req.params.id);
        result ? 
            res.json({ message: 'Cart has been deleted' }) : 
            res.status(404).json({ error: 'Item not found' });

        await disconnetMongoDB();
    };
    
    async productsOnCart (req, res) {
        await initMongoDB();
        
        const products = await getProductsByIdCart(req.params.id);

        products?.length > 0 ?
            res.json({ products }) : 
            res.status(404).json({ error: 'Not found' });

        await disconnetMongoDB();
    };
    
    async addProductToCart (req, res) {
        await initMongoDB();
        
        const newProducts = await addProductToCart(req.params.id, req.body);
        newProducts?.products?.length > 0 ?
            res.json({ message: 'Products has been added', data: newProducts }) :
            res.status(404).json({ error: 'Item not added' });
        await disconnetMongoDB();
    };
    
    async deleteProductOnCart (req, res) {
        await initMongoDB();
        
        const result = await deleteProductFromCart(req.params.id, req.params.id_prod);
        res.json({ message: 'Product has been deleted', data: result })
        await disconnetMongoDB();
    };
}

const cartController = new CartController();

module.exports = { cartController }