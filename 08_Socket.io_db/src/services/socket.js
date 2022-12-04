const socketIo = require('socket.io');
const { allproducts } = require('./productsHelper');
const { sql } = require('../../database/messageClientSQL');

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
    //await sql.createTable();

    const messages = /* await sql.getAll() */ [];
    messages.forEach(message => {
        io.emit('chat', message);
    });
    
    socket.on('chat', async (data) => {
        const newMessage = {
            author: {
                id: data.email,
                nombre: data.name,
                apellido: data.lastName,
                edad: data.age,
                alias: data.alias,
                avatar: data.avatar
            },
            text: data.message
        }

        console.log(newMessage);

        //const message = await sql.save(newMessage);

        io.emit('chat', message);
    });
}

const getWsServer = () => {
    return io;
}

module.exports = {
    initWsServer,
    getWsServer
};