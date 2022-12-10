const mongoose = require('mongoose');

const messagesCollection = 'messages';

const MessageSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
        mensaje: { type: String, required: true },
    },
    { timestamps: true }
);

const MessageModel = mongoose.model(messagesCollection, MessageSchema);

module.exports = { MessageModel, messagesCollection };