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
        const products = await this.getAll().then(data => data);
        const idHigher = Math.max(...products.map(product => product.id));
        const newProductCreated = { ...newProduct, id: (idHigher == -Infinity ? 0 : idHigher) + 1 };

        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...products, newProductCreated]))
            .then(() => newProductCreated.id)
            .catch(error => { error });
    }

    async getById(idProduct) {
        const products = await this.getAll();
        return products.find(product => product.id === idProduct) || []
    }

    getAll() {
        return fs.promises.readFile(this.nombreArchivo, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(error => { error } );
    }

    async deleteById(idProduct) {
        const products = await this.getAll();
        const newProducts = products.filter(product => product.id !== idProduct);
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newProducts))
            .catch(error => { error });
    }

    deleteAll() {
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
            .catch(error => { error });
    }
}

const contenedor = new Contenedor('productos.txt');

(async () => {
    //console.log(await contenedor.save({ title: 'Globo', price: 443.45, thumbnail: 'https://www.coder.com' }));
    //console.log(await contenedor.getById(11));
    //await contenedor.deleteById(8);
    //await contenedor.deleteAll();
    console.log(await contenedor.getAll());
})()
