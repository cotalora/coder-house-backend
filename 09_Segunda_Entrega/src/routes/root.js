const { Router } = require('express');
const routerProducts = require('./products');
const routerCart = require('./cart');
const routerFirebaseProducts = require('./productsFirebase');
const routerFirebaseCart = require('./cartFirebase');

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

router.use('/mongo/productos', checkAdminRole, routerProducts);
router.use('/mongo/carrito', routerCart);
router.use('/firebase/productos', checkAdminRole, routerFirebaseProducts);
router.use('/firebase/carrito', routerFirebaseCart);
router.get('/*', routerNotFound);

module.exports = router;