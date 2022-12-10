const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_CONNECTION;

const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
        return err;
    }
}

const disconnetMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.log('Error disconnecting from MongoDB', err);
        return err;
    }
}

module.exports = { initMongoDB, disconnetMongoDB };