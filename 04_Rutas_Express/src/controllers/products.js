const products = async (req, res) => {
    res.json({ message: 'Productos' });
};

const product = async (req, res) => {
    res.json({ message: `Producto: ${req.params.id}` });
};

const addProduct = async (req, res) => {
    res.json({ message: `Producto: ${req.params.id}` });
};

const updateProduct = async (req, res) => {
    res.json({ message: `Producto: ${req.params.id}` });
};

const deleteProduct = async (req, res) => {
    res.json({ message: `Producto: ${req.params.id}` });
};


module.exports = {
    products,
    product,
    addProduct,
    updateProduct,
    deleteProduct
}