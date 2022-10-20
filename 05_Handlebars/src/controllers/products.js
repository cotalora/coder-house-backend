const { contenedor } = require("../../data");

const products = async (req, res) => {
    const products = await contenedor.getAll();
    res.json(products);
};

const product = async (req, res) => {
    const product = await contenedor.getById(parseInt(req.params.id));
    Object.keys(product).length > 0 ? res.json(product) : res.status(404).json({ error: 'Item not found' });
};

const addProduct = async ({ body }, res) => {
    const newProduct = await contenedor.save(body);
    Object.keys(newProduct).length > 0 ? 
        res.json({ message: 'Product has been added', data: newProduct }) : 
        res.status(400).json({ error: 'Item not created' });
};

const updateProduct = async (req, res) => {
    const result = await contenedor.updateById(parseInt(req.params.id), req.body);
    Object.keys(result).length > 0 ? 
        res.json({ message: 'Product has been updated', data: result }) : 
        res.status(404).json({ error: 'Item not found' });
};

const deleteProduct = async (req, res) => {
    const result = await contenedor.deleteById(parseInt(req.params.id));
    result.length > 0 ? res.json({ message: 'Product has been deleted'}) : res.status(404).json({ error: 'Item not found' });
};


module.exports = {
    products,
    product,
    addProduct,
    updateProduct,
    deleteProduct
}