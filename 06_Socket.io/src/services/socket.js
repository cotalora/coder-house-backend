const socketIo = require('socket.io');
const { allproducts, addProduct } = require('./productsHelper');

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
        await addProduct(data);
        const products = await allproducts();
        io.emit('products', products);
    });
}

const wsChat = (socket) => {
    socket.on('chat', (data) => {
        const newMessage = {
            email: data.email,
            message: data.message,
            date: new Date().toLocaleString()
        }
        io.emit('chat', newMessage);
    });
}

const getWsServer = () => {
    return io;
}

module.exports = {
    initWsServer,
    getWsServer
};