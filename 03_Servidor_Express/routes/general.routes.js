const express = require('express');
const { products, randomProducts, routeNotFound } = require('../controllers/general.controller');
const router = express.Router();

router.get('/productos', products);
router.get('/productoRandom', randomProducts);
router.get('/*', routeNotFound);

module.exports = router;