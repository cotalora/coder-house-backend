const { Router } = require("express");
const { information } = require("../controllers/info/info");
const { random } = require("../controllers/info/random");
const compression = require("compression");
const { logger, loggerWarn } = require("../../log4js.conf");

const router = Router();

const requestLogger = (req, res, next) => {
    logger.info(`New request to ${req.url}`);
    next();
}

router.get('/get', requestLogger, information);
router.get('/getgzip', requestLogger, compression(), information);
router.get('/get/random', requestLogger, random);
router.get('/*', (req, res) => {
    loggerWarn.warn(`404 Not found: ${req.url}`);
    res.status(404).json({ error: 'Not found' });
});

module.exports = router;