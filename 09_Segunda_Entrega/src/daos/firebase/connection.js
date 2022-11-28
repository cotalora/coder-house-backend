const init  = require('firebase/app');
const gerFire = require("firebase/firestore");

const config = {
    apiKey: "AIzaSyCTFpe5qmFmFiPMibgflYMK8v085cKUGkE",
    authDomain: "ecommerce-ee7f9.firebaseapp.com",
    projectId: "ecommerce-ee7f9",
    storageBucket: "ecommerce-ee7f9.appspot.com",
    messagingSenderId: "234660136682",
    appId: "1:234660136682:web:23f14c2cfc869451c33993"
}

const app = init.initializeApp(config);

const db = gerFire.getFirestore(app);
module.exports = { db };