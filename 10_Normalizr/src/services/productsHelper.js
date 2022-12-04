const { faker } = require('@faker-js/faker');

const allproducts = () => {
    let products = [];
    for (let i = 0; i < 5; i++) {
        products = [
            ...products,
            {
                id: faker.datatype.number(),
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                thumbnail: faker.image.abstract(1234, 2345, true),
            }
        ]
    }
    return products;
};

module.exports = {
    allproducts
}