const { contenedor } = require("../../data");

const allproducts = async () => {
    const products = await contenedor.getAll();
    return products;
};

const addProduct = async (product) => {
    await contenedor.save(product);
};

module.exports = {
    allproducts,
    addProduct,
}