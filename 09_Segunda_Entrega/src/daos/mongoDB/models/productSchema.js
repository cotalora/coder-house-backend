const mongoose = require('mongoose');

const productsCollection = 'products';

const ProductSchema = new mongoose.Schema(
    {
        nombre: { type: String, require: true, max: 100 },
        descripcion: { type: String, require: true, max: 200 },
        codigo: { type: String, require: true, max: 100 },
        foto: { type: String, require: true, max: 200 },
        precio: { type: mongoose.Types.Decimal128, require: true, max: 50 },
        stock: { type: Number, require: true, max: 100 }
    },
    { timestamps: true }
);

const ProductModel = mongoose.model(productsCollection, ProductSchema);

module.exports = { ProductModel, productsCollection };