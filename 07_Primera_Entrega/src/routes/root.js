const { Router } = require('express');
const routerProducts = require('./products');
const routerCart = require('./cart');
const routerNotFound = require('./notFound');
const router = Router();

const isAdmin = true;

const checkAdminRole = (req, res, next) => {
    if (isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Error: 401 Unauthorized' });
    }
}

router.use('/productos', checkAdminRole, routerProducts);
router.use('/carrito', routerCart);
router.get('/*', routerNotFound);

module.exports = router;