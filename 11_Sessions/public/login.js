const formLogin = document.getElementById('formLogin');
const userName = document.getElementById('userName');

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    
    axios.post('/login', {
        userName: userName.value
    }).then((res) => {
        window.location.href = '/';
    });

    userName.value = '';

    userName.focus();
});
