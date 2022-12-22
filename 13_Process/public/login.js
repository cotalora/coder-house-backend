const formLogin = document.getElementById('formLogin');
const email = document.getElementById('email');
const password = document.getElementById('password');
const buttonSubmit = document.getElementById('buttonSubmit');
const errorMessage = document.getElementById('messages-error');

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    
    buttonSubmit.setAttribute('disabled', true);
    axios.post('/login', {
        email: email.value,
        password: password.value
    }).then((res) => {
        resetFileds();
        buttonSubmit.removeAttribute('disabled');
        errorMessage.innerHTML = '';
        window.location.href = '/';
    }).catch((err) => {
        resetFileds();
        errorMessage.append('Correo o contraseña incorrectos');
    });
});

resetFileds = () => {
    email.value = '';
    password.value = '';

    email.focus();
}