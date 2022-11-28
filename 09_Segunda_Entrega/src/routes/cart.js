const { Router } = require('express');
const { cartController } = require('../controllers/mongo/cart');

const router = Router();

router.post('/', cartController.addCart);
router.delete('/:id', cartController.deleteCart);
router.get('/:id/productos', cartController.productsOnCart);
router.post('/:id/productos', cartController.addProductToCart);
router.delete('/:id/productos/:id_prod', cartController.deleteProductOnCart);

module.exports = router;