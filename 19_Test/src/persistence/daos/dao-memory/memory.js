class Memory {
    constructor() {
        this.products = [];
    }

    async save(product) {
        this.products = [...this.products, product];
        return product;
    }

    async getAll() {
        return this.products;
    }
}

module.exports = Memory;