const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const { db } = require("./connection");

const createProduct = async (newPRoduct) => {
    try {
        const docRef = await addDoc(collection(db, "products"), newPRoduct);
        return docRef;
    } catch (error) {
        console.log('Error creating product', error);
    }
}

const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map(doc => doc.data());
    } catch (err) {
        console.log('Error getting products', err);
    }
}

const getProduct = async (id) => {
    try {
        const data = await getDoc(doc(db, "products", id));
        return data.data();
    } catch (err) {
        console.log('Error getting product', err);
    }
}

const updateById = async (id, product) => {
    try {
        await updateDoc(doc(db, "products", id), product);
        return true;
    } catch (error) {
        console.log('Error updating product', err);
    }
}

const deleteById = async (id) => {
    try {
        await deleteDoc(doc(db, "products", id));
        return true;
    } catch (error) {
        console.log('Error deleting product', err);
    }
}

module.exports = { createProduct, getProducts, getProduct, updateById, deleteById };