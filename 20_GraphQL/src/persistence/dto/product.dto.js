class ProductDTO {
    constructor({ name, price, stock }) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

function asDto(products) {
    if (Array.isArray(products)) {
        return products.map(product => new ProductDTO(product));
    }
    else {
        return new ProductDTO(products);
    }
}

module.exports = { ProductDTO, asDto };