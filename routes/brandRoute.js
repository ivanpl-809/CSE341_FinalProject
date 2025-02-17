const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsController');

router.post('/', brandsController.createBrand);
router.put('/:brandsId', brandsController.updateBrand);
router.get('/', brandsController.getBrands);
router.get('/findByCountry', brandsController.findBrandsByCountry);
router.get('/findByName', brandsController.findBrandsByName);
router.get('/:brandsId', brandsController.getBrandById);
router.delete('/:brandsId', brandsController.deleteBrandById);

module.exports = router;