const { save, getAll } = require('../persistence/presistance');

async function saveProduct(product) {
    return await save(product);
}

async function getProducts() {
    return await getAll();
}

module.exports = { saveProduct, getProducts };