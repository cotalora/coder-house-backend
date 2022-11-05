const fs = require('fs');

const initialValues = [
    {
        id: 1,
        timestamp: '2021-09-01T00:00:00.000Z',
        nombre: 'Escuadra',
        descripcion: 'Calculo de areas',
        codigo: '1234',
        foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        precio: 123.45,
        stock: 10
    },
    {
        id: 2,
        timestamp: '2021-09-01T00:00:00.000Z',
        nombre: 'Calculadora',
        descripcion: 'Calculo de areas',
        codigo: '1234',
        foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        precio: 234.56,
        stock: 5
    },
    {
        id: 3,
        timestamp: '2021-09-01T00:00:00.000Z',
        nombre: 'Globo Terráqueo',
        descripcion: 'Calculo de areas',
        codigo: '1234',
        foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        precio: 345.67,
        stock: 5
    }
]

class Producto {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;

        !fs.existsSync(this.nombreArchivo) ?
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(initialValues)) :
            fs.readFileSync(this.nombreArchivo, 'utf-8') === '' &&
                fs.writeFileSync(this.nombreArchivo, JSON.stringify([]));
    }

    async save(newProduct) {
        if (newProduct.nombre && newProduct.descripcion && 
            newProduct.codigo && newProduct.foto && newProduct.precio && newProduct.stock) {
            const products = await this.getAll().then(data => data);
            const idHigher = Math.max(...products.map(product => product.id));
            newProduct = {
                ...newProduct,
                timestamp: new Date().toISOString(),
            }
            const newProductCreated = { ...newProduct, id: (idHigher == -Infinity ? 0 : idHigher) + 1 };
    
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...products, newProductCreated]))
                .then(() => newProductCreated)
                .catch(error => { error });
        }
        return {};
    }

    async getById(idProduct) {
        const products = await this.getAll();
        return products.find(product => product.id === idProduct) || {};
    }

    getAll() {
        return fs.promises.readFile(this.nombreArchivo, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(error => { error } );
    }

    async updateById(idProduct, newProduct) {
        const products = await this.getAll();
        const productToUpdate = products.find(product => product.id === idProduct);
        if (productToUpdate) {
            newProduct = {
                ...newProduct,
                timestamp: new Date().toISOString(),
            }
            const newProducts = products.map(product => product.id === idProduct ? 
                { ...productToUpdate, ...newProduct } : 
                product
            );
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...newProducts]))
                .then(() => newProducts.find(product => product.id === idProduct))
                .catch(error => { error });
        }
        return {};
    }

    async deleteById(idProduct) {
        const products = await this.getAll();
        const productToDelete = products.filter(product => product.id === idProduct);
        const newProducts = products.filter(product => product.id !== idProduct);
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newProducts))
            .then(() => productToDelete)
            .catch(error => { error });
    }

    deleteAll() {
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
            .catch(error => { error });
    }
}

const producto = new Producto('productos.txt');

module.exports = {
    producto
}