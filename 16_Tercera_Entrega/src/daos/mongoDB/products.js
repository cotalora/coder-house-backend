const { ProductModel } = require('./models/productSchema');

const createProduct = async (newPRoduct) => {
    try {
        return await ProductModel.create(newPRoduct);
    } catch (err) {
        console.log('Error creating product', err);
    }
}

const getProducts = async () => {
    try {
        return await ProductModel.find();
    } catch (err) {
        console.log('Error getting products', err);
    }
}

const getProduct = async (id) => {
    try {
        return await ProductModel.findById(id);
    } catch (err) {
        console.log('Error getting product', err);
    }
}

const updateById = async (id, product) => {
    try {
        return await ProductModel.findByIdAndUpdate(id, product);
    } catch (error) {
        console.log('Error updating product', err);
    }
}

const deleteById = async (id) => {
    try {
        return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('Error deleting product', err);
    }
}

module.exports = { createProduct, getProducts, getProduct, updateById, deleteById };