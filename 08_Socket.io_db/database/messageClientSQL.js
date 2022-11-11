const knex = require('knex');
const { messageOptionConnection } = require('./dbConnections');

class MessageClienteSQL {
    constructor(config) {
        this.knex = knex(config);
    }

    async createTable() {
        await this.knex.schema.dropTableIfExists('messages');
        await this.knex.schema.createTable('messages', table => {
            table.increments('id').primary();
            table.string('email', 50).notNullable();
            table.string('message', 100).notNullable();
            table.timestamp('date').notNullable();
        });
    }

    getAll() {
        return this.knex.select('*').from('messages');
    }

    async save(message) {
        const id = await this.knex('messages').insert(message);
        return { id: id[0], ...message };
    }
}

const sql = new MessageClienteSQL(messageOptionConnection);

module.exports = {
    sql
}