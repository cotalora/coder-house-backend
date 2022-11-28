const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const { db } = require("./connection");

const createCart = async (newCart) => {
    try {
        const docRef = await addDoc(collection(db, "carts"), newCart);
        return docRef;
    } catch (error) {
        console.log('Error creating product', error);
    }
}


const deleteById = async (id) => {
    try {
        await deleteDoc(doc(db, "carts", id));
        return true;
    } catch (err) {
        console.log('Error deleting cart', err);
    }
}

const getProductsByIdCart = async (id) => {
    try {
        const data = await getDoc(doc(db, "carts", id));
        return data.data()?.products;
    } catch (err) {
        console.log('Error getting products', err);
    }
}

const addProductToCart = async (id, newProduct) => {
    try {
        const data = await getDoc(doc(db, "carts", id));
        const cart = data.data();
        await updateDoc(doc(db, "carts", id), { ...cart, products: [...cart.products, newProduct] });
        return { ...cart, products: [...cart.products, newProduct] };
    } catch (err) {
        console.log('Error adding product', err);
    }
}

module.exports = { createCart, deleteById, getProductsByIdCart, addProductToCart };