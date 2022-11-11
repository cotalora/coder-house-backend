const messageOptionConnection = {
    client: 'sqlite3',
    connection: {
        filename: "./db/db.sqlite"
    },
    useNullAsDefault: true
}

const productOptionConnection = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'products'
    }
}

module.exports = {
    messageOptionConnection,
    productOptionConnection
}