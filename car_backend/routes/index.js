const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/cars', require('./carsRoutes'));

module.exports = router;
