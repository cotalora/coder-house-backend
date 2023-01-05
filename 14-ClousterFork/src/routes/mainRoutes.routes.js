const { Router } = require("express");
const { information } = require("../controllers/info");
const { random } = require("../controllers/random");

const router = Router();

router.get('/info', information);
router.get('/api/random', random);

module.exports = router;