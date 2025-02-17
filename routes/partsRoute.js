const express = require('express');
const router = express.Router();
const partsController = require('../controllers/partsController');
const { isAuthenticated } = require('./middleware/auth');

router.post('/', isAuthenticated, partsController.createPart);
router.put('/:id', isAuthenticated, partsController.updatePart);
router.get('/', partsController.getParts);
router.get('/:id', partsController.getPartById);
router.delete('/:id', isAuthenticated, partsController.deletePart);

module.exports = router;