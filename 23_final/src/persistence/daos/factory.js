const File = require('./dao-filesystem/fileSystem');
const Memory = require('./dao-memory/memory');
const { productSchema } = require('./dao-mongodb/schemas/productSchema');
const { initMongoDB, MongoDB } = require('./dao-mongodb/mongoDB');

let dao;

switch (process.env.PERSISTENCE) {
    case 'FILE':
        dao = new File('products.txt');
        break;
    case 'MONGODB':
        initMongoDB();
        dao = new MongoDB('products', productSchema);
        break;
    default:
        dao = new Memory();
        break;
}

async function save(product) {
    return await dao.save(product);
};

async function getAll() {
    return await dao.getAll();
};

function getDao() {
    return dao;
};

module.exports = { save, getAll, getDao };