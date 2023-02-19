const { getDao } = require("../daos/factory");
const { asDto } = require("../dto/product.dto");

class ProductsRepository {
    constructor() {
        this.dao = getDao();
    }

    async save(product) {
        return await this.dao.save(product);
    }

    async getAll() {
        const products = await this.dao.getAll();
        return products.map((product) => asDto(product));
    }
}

module.exports = new ProductsRepository();