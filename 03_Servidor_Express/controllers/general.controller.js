const { contenedor } = require("../data");

const products = async (req, res) => {
    const products = await contenedor.getAll();
    res.send(JSON.stringify(products));
}

const randomProducts = async (req, res) => {
    const products = await contenedor.getAll();
    const randomValue = products[Math.floor(Math.random() * products.length)];
    res.send(JSON.stringify(randomValue));
}

const routeNotFound = (req, res) => {
    res.send('404. Route not found');
};

module.exports = {
    products,
    randomProducts,
    routeNotFound
};