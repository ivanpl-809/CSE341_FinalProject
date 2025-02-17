const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./middleware/auth');

// Protected route example
router.get('/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

// Import and use routes
router.use('/vehicles', require('./vehicleRoute'));
router.use('/parts', require('./partsRoute'));
router.use('/brands', require('./brandRoute'));
router.use('/aftermarket-companies', require('./aftermarketCompaniesRoute'));

module.exports = router;