const { Router } = require('express');
const { productController } = require('../controllers/firebase/products');

const router = Router();

router.post('/', productController.addProduct);
router.get('/', productController.products);
router.get('/:id', productController.product);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct); 

module.exports = router;