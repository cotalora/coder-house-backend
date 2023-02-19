const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const initMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

class MongoDB {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    async save(product) {
        try {
            const newProduct = this.collection.create(product);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const products = await this.collection.find({});
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { initMongoDB, MongoDB };