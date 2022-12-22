import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

const UserModel = model('user', UserSchema);

module.exports = UserModel;