const fs = require('fs');

class FileSystem {
    constructor(path) {
        this.path = path;
    }

    async save(product) {
        try {
            let products = await this.getAll();
            products = [...products, product];
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const productList = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productList);
            }
            else { return [] };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FileSystem;