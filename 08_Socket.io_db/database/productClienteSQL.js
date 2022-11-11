const knex = require('knex');
const { productOptionConnection } = require('./dbConnections');

class ProductClienteSQL {
    constructor(config) {
        this.knex = knex(config);
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists('products');
        await this.knex.schema.createTable('products', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.integer('price', 100).notNullable();
            table.string('thumbnail', 150).notNullable();
        });
    }

    getAll() {
        return this.knex.select('*').from('products');
    }

    async save(product) {
        const id = await this.knex('products').insert(product);
        return { id: id[0], ...product };
    }
}

const sql = new ProductClienteSQL(productOptionConnection);

module.exports = {
    sql
};