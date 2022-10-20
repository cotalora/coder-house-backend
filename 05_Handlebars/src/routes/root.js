const { Router } = require('express');
const routerProducts = require('./products');
const routerNotFound = require('./notFound');
const router = Router();

router.use('/productos', routerProducts);
router.get('/*', routerNotFound);

module.exports = router;