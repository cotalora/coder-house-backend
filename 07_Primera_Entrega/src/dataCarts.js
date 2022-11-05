const fs = require('fs');

const initialValues = [];

class Cart {
    constructor() {
        this.nombreArchivo = 'carts.txt';

        !fs.existsSync(this.nombreArchivo) ?
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(initialValues)) :
            fs.readFileSync(this.nombreArchivo, 'utf-8') === '' &&
                fs.writeFileSync(this.nombreArchivo, JSON.stringify([]));
    }

    getAll() {
        return fs.promises.readFile(this.nombreArchivo, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(error => { error } );
    }

    async save(newCart) {
        if (newCart.timestamp && newCart.products) {
            const carts = await this.getAll().then(data => data);
            const idHigher = Math.max(...carts.map(cart => cart.id));
            const newCartCreated = { ...newCart, id: (idHigher == -Infinity ? 0 : idHigher) + 1 };
    
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...carts, newCartCreated]))
                .then(() => newCartCreated)
                .catch(error => { error });
        }
    }

    async deleteById(idCart) {
        const carts = await this.getAll();
        const cartToDelete = carts.filter(cart => cart.id === idCart);
        const newCarts = carts.filter(cart => cart.id !== idCart);
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newCarts))
            .then(() => cartToDelete)
            .catch(error => { error });
    }

    async getProductsByIdCart(idCart) {
        const carts = await this.getAll();
        const cartSelected = carts.find(cart => cart.id === idCart);
        return cartSelected ? cartSelected.products : [];
    }

    async addProductToCart(idCart, newProduct) {
        const carts = await this.getAll();
        const cartSelected = carts.find(cart => cart.id === idCart);
        if (cartSelected) {
            const newProducts = [...cartSelected.products, newProduct];
            const newCarts = carts.map(cart => cart.id === idCart ? 
                { ...cartSelected, products: newProducts } : 
                cart
            );
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...newCarts]))
                .then(() => newProducts)
                .catch(error => { error });
        }
    }

    async deleteProductFromCart(idCart, idProduct) {
        const carts = await this.getAll();
        const cartSelected = carts.find(cart => cart.id === idCart);
        if (cartSelected) {
            const newProducts = cartSelected.products.filter(product => product.id !== idProduct);
            const newCarts = carts.map(cart => cart.id === idCart ? 
                { ...cartSelected, products: newProducts } : 
                cart
            );
            return fs.promises.writeFile(this.nombreArchivo, JSON.stringify([...newCarts]))
                .then(() => {newProducts})
                .catch(error => { error });
        }
    }
}

const cart = new Cart();

module.exports = {
    cart
}