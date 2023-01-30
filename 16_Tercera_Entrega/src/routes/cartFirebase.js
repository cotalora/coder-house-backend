const { Router } = require('express');
const { cartController } = require('../controllers/firebase/cart');

const router = Router();

router.post('/', cartController.addCart);
router.delete('/:id', cartController.deleteCart);
router.get('/:id/productos', cartController.productsOnCart);
router.post('/:id/productos', cartController.addProductToCart);

module.exports = router;