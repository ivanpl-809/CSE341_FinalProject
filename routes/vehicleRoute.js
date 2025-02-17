const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicleController');
const { isAuthenticated } = require('./middleware/auth');

router.post('/', isAuthenticated, vehiclesController.createVehicle);
router.put('/:id', isAuthenticated, vehiclesController.updateVehicle);
router.get('/', vehiclesController.getVehicles);
router.get('/:id', vehiclesController.getVehicleById);
router.delete('/:id', isAuthenticated, vehiclesController.deleteVehicle);

module.exports = router;