const socket = io();

saveProduct = (title, price, thumbnail) => {
    socket.emit('products', {
        title,
        price,
        thumbnail
    });
}

saveChat = (email, message) => {
    socket.emit('chat', {
        email,
        message
    });
}

socket.on('products', renderProducts);
socket.on('chat', renderChat);
