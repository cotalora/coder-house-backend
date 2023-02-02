const { Router } = require("express");
const { getAll, save } = require("../controllers/products/products.controller");
const { logger, loggerWarn } = require("../../log4js.conf");

const router = Router();

const requestLogger = (req, res, next) => {
    logger.info(`New request to ${req.url}`);
    next();
}

router.post('/', requestLogger, save);
router.get('/', requestLogger, getAll);

router.get('/*', (req, res) => {
    loggerWarn.warn(`404 Not found: ${req.url}`);
    res.status(404).json({ error: 'Not found' });
});

module.exports = router;