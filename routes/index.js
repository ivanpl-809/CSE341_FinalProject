const express = require('express');
const router = express.Router();
const partsController = require('../controllers/partsController');
const { isAuthenticated } = require('../utils/oauth');

// Protected route example
router.get('/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

// Parts routes
router.get('/parts', partsController.getAllParts);
router.post('/parts', partsController.createPart);
router.put('/parts/:id', partsController.updatePart);
router.delete('/parts/:id', partsController.deletePart);

module.exports = router;