const formRegister = document.getElementById('formRegister');
const email = document.getElementById('email');
const password = document.getElementById('password');
const buttonSubmit = document.getElementById('buttonSubmit');
const errorMessage = document.getElementById('messages-error');
const successMessage = document.getElementById('messages-success');

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    buttonSubmit.setAttribute('disabled', true);

    axios.post('/signup', {
        email: email.value,
        password: password.value
    }).then((res) => {
        resetFileds();
        if (res.data) {
            successMessage.append('Usuario creado con éxito');
            errorMessage.innerHTML = '';
        };
    }).catch((err) => {
        resetFileds();
        errorMessage.append(err.response.data.message);
        successMessage.innerHTML = '';
    });
});

const resetFileds = () => {
    email.value = '';
    password.value = '';
    buttonSubmit.removeAttribute('disabled');

    email.focus();
}