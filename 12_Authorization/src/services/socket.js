const socketIo = require('socket.io');
const { allproducts } = require('./productsHelper');
const { messasgeNormalize } = require('../../utils/messagesNormalizer');
const { initMongoDB, disconnetMongoDB } = require('../daos/connection');
const { createMessage, getMessages } = require('../daos/messages');

let io;

const initWsServer = (server) => {
    io = socketIo(server);
    io.on('connection', async (socket) => {
        console.log('Client has been connected');

        const products = await allproducts();
        io.emit('products', products);

        wsProducts(socket);
        wsChat(socket);

        socket.on('disconnect', () => {
            console.log('Client has been disconnected');
        });
    });

    return io;
}

const wsProducts = (socket) => {
    socket.on('products', async (data) => {
        const products = await allproducts();
        io.emit('products', products);
    });
}

const wsChat = async (socket) => {
    await initMongoDB();

    const messages = await getMessages();
    const messagesMapper = messages?.map((message) => {
        return {
            author: {
                id: message.id,
                nombre: message.nombre,
                lastName: message.apellido,
                edad: message.edad,
                alias: message.alias,
                avatar: message.avatar,
                fecha: message.createdAt
            },
            text: message.mensaje,
        }
    });

    const newMessasges = messasgeNormalize(messagesMapper);
    io.emit('chat', Object.keys(newMessasges).map((key) => { return newMessasges[key] }));
    
    socket.on('chat', async (data) => {
        const newMessage = {
            id: data.email,
            nombre: data.name,
            apellido: data.lastName,
            edad: data.age,
            alias: data.alias,
            avatar: data.avatar,
            mensaje: data.message
        }

        const messageCreated = await createMessage(newMessage);

        io.emit('chat', [{
            author: {
                id: messageCreated.id,
                nombre: messageCreated.nombre,
                lastName: messageCreated.apellido,
                edad: messageCreated.edad,
                alias: messageCreated.alias,
                avatar: messageCreated.avatar,
                fecha: messageCreated.createdAt
            },
            text: messageCreated.mensaje
        }]);
    });

}

const getWsServer = () => {
    return io;
}

module.exports = {
    initWsServer,
    getWsServer
};