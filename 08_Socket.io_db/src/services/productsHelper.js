const { sql } = require('../../database/productClienteSQL');

const allproducts = async () => {
    //await sql.createTable();
    return await sql.getAll();
};

const addProduct = async (product) => {
    await sql.save(product);
};

module.exports = {
    allproducts,
    addProduct,
}