const socket = io();

saveProduct = (title, price, thumbnail) => {
    socket.emit('products', {
        title,
        price,
        thumbnail
    });
}

saveChat = (email, message, avatar, name, lastName, age, alias) => {
    socket.emit('chat', {
        email,
        message,
        avatar,
        name,
        lastName,
        age,
        alias
    });
}

socket.on('products', renderProducts);
socket.on('chat', renderChat);
