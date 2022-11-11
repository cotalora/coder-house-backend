const form = document.getElementById('form');
const title = document.getElementById('title');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');

const formChat = document.getElementById('formChat');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    saveProduct(title.value, price.value, thumbnail.value);

    title.value = '';
    price.value = '';
    thumbnail.value = '';

    title.focus();
});

formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    
    saveChat(email.value, message.value);

    message.value = '';

    message.focus();
});