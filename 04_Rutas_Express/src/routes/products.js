const { Router } = require('express');
const { products, product, addProduct, updateProduct, deleteProduct } = require('../controllers/products')

const router = Router();

router.get('/', products);
router.get('/:id', product);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;