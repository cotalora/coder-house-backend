const { Router } = require('express');
const router = Router();

router.get('/*', (req, res) => {
    res.status(404).json({ message: 'Error: 404 Resourse not found' });
});

module.exports = router;