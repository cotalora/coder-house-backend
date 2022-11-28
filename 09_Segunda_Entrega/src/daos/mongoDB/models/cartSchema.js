const mongoose = require('mongoose');
const { productsCollection } = require('./productSchema');

const cartsCollection = 'carts';

const CartSchema = new mongoose.Schema(
    {
        products: {
            type: [mongoose.Schema.Types.ObjectId, { ref: productsCollection, require: true }],
        }
    },
    { timestamps: true }
);

const CartModel = mongoose.model(cartsCollection, CartSchema);

module.exports = { CartModel, cartsCollection };