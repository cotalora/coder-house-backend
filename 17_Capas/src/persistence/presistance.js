const File = require('./filesystem/fileSystem');
const Memory = require('./memory/memory');
const { productSchema } = require('./mongodb/schemas/productSchema');
const { initMongoDB, MongoDB } = require('./mongodb/mongoDB');

let persistence;

switch (process.env.PERSISTENCE) {
    case 'FILE':
        persistence = new File('products.txt');
        break;
    case 'MONGODB':
        initMongoDB();
        persistence = new MongoDB('products', productSchema);
        break;
    default:
        persistence = new Memory();
        break;
}

async function save(product) {
    return await persistence.save(product);
};

async function getAll() {
    return await persistence.getAll();
}

module.exports = { save, getAll };