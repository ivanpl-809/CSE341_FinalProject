const router = require('express').Router();
router.use('/parts', require('./partsRoute'));
router.use('/aftermarketComp', require('./aftermarketCompaniesRoute')); 
router.use('/vehicle', require('./vehicleRoute'));

module.exports = router;

