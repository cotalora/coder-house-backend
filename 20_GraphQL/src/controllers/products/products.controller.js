const { saveProduct, getProducts } = require("../../services/products.services");

const save = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await saveProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { save, getAll };