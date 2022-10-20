const { Router } = require('express');
const { products, addProduct } = require('../controllers/renderProducts')

const router = Router();

router.get('/', products);
router.post('/', addProduct);

module.exports = router;