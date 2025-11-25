const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

// GET /api/cars
router.get('/', carsController.getAllCars);

module.exports = router;
