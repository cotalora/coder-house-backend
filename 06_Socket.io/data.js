const fs = require('fs');

const initialValues = [
    {
        id: 1,
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://www.coder.com',
    },
    {
        id: 2,
        title: 'Calculadora',
        price: 333.45,
        thumbnail: 'https://www.coder.com',
    },
    {
        id: 3,
        title: 'Globo',
        price: 443.45,
        thumbnail: 'https://www.coder.com',
    }
]

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;

        !fs.existsSync(this.nombreArchivo) ?
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(initialValues)) :
            fs.readFileSync(this.nombreArchivo, 'utf-8') === '' &&
                fs.writeFileSync(this.nombreArchivo, JSON.stringify([]));
    }

    async save(newProduct) {
        if (newProduct.title && newProduct.price && newProduct.thumbnail) {
            const products = await this.getAll().then(data => data);
            const idHigher = Math.max(...products.map(product => product.id));
            const newProductCreated = { ...newProduct, id: (idHigher == -Infinity ? 0 : idHigher) + 1 };
    
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...products, newProductCreated]))
                .then(() => newProductCreated)
                .catch(error => { error });
        }
        return {};
    }

    getAll() {
        return fs.promises.readFile(this.nombreArchivo, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(error => { error } );
    }
}

const contenedor = new Contenedor('productos.txt');

module.exports = {
    contenedor
}