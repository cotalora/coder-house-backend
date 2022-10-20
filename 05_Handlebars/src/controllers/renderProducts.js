const { contenedor } = require("../../data");

const products = async (req, res) => {
    const products = await contenedor.getAll();
    res.render('main', { layout: 'index.hbs', products });
};

const addProduct = async ({ body }, res) => {
    await contenedor.save(body);
    const products = await contenedor.getAll();
    
    res.render('main', { layout: 'index.hbs', products });
};

module.exports = {
    products,
    addProduct
}