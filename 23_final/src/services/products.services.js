const productsRepository = require('../persistence/repository/products.repository');

async function saveProduct(product) {
    return await productsRepository.save(product);
}

async function getProducts() {
    return await productsRepository.getAll();
}

module.exports = { saveProduct, getProducts };