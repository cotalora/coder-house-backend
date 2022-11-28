const { CartModel } = require("./models/cartSchema");


const createCart = async (newCart) => {
    try {
        return await CartModel.create(newCart);
    } catch (err) {
        console.log('Error creating cart', err);
    }
}

const deleteById = async (id) => {
    try {
        return await CartModel.findByIdAndDelete(id);
    } catch (err) {
        console.log('Error deleting cart', err);
    }
}

const getProductsByIdCart = async (id) => {
    try {
        const cart = await CartModel.findById(id);
        return cart?.products;
    } catch (err) {
        console.log('Error getting products', err);
    }
}

const addProductToCart = async (id, newProduct) => {
    try {
        const cart = await CartModel.findById(id);
        cart.products.push(newProduct);
        return await cart.save();
    } catch (err) {
        console.log('Error adding product', err);
    }
}

const deleteProductFromCart = async (id, id_prod) => {
    try {
        const cart = await CartModel.findById(id);
        cart.products = cart.products.filter(prod => prod._id != id_prod);
        return await cart.save();
    } catch (err) {
        console.log('Error deleting product', err);
    }
}

module.exports = { createCart, deleteById, getProductsByIdCart, addProductToCart, deleteProductFromCart };