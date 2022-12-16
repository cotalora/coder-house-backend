const mongoose = require('mongoose');

const userCollection = 'users';

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
);

const UserModel = mongoose.model(userCollection, UserSchema);

module.exports = { UserModel, userCollection };