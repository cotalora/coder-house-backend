const button = document.getElementById('post-btn');

const form = document.getElementById('post-form');
const list = document.getElementById('get-list');
form.style.display = 'none';
list.style.display = 'block';

button.addEventListener('click', async _ => {
    if (form.style.display === 'none') {
        form.style.display = 'flex';
        list.style.display = 'none';
    } else {
        form.style.display = 'none';
        list.style.display = 'block';
    }
});