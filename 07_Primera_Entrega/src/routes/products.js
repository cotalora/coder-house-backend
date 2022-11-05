const { Router } = require('express');
const { productController } = require('../controllers/products')

const router = Router();

router.get('/', productController.products);
router.get('/:id', productController.product);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;