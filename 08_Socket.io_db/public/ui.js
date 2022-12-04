const productList = document.querySelector("#tbody");
const messagesList = document.querySelector("#messages-container");

const productUI = (product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td><img class='product-img' src='${product.thumbnail}' alt='${product.title}' /></td>
    `;

    return tr;
};

const messageUI = (message) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <span class="email-text">${message.email}</span>
    <span class="date-text"><b>[</b>${message.date}<b>]</b></span>
    <span class="message-text"><b>:</b>${message.message}</span>
    <img class="avatar-image" src='${message.image}' alt='avatar' />
    `;

    return div;
}

const renderProducts = (products = []) => {
    productList.innerHTML = "";
    products.forEach((product) => {
        productList.append(productUI(product));
    });
};
const renderChat = (messages) => {
    messagesList.append(messageUI(messages));
};