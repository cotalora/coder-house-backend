const formChat = document.getElementById('formChat');
const email = document.getElementById('email');
const name = document.getElementById('name');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');
const message = document.getElementById('message');
const logoutButton = document.getElementById('logout');

formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    
    saveChat(email.value, message.value, avatar.value, name.value, lastName.value, age.value, alias.value);

    message.value = '';

    message.focus();
});

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    window.location.href = '/logout';
})