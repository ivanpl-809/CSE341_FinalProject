const Brand = require('../models/brandsModel');

// Create a brand
exports.createBrand = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a brand
exports.updateBrand = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.brandsId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all brands
exports.getBrands = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find brands by country
exports.findBrandsByCountry = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brands = await Brand.find({ Country: req.query.country });
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find brands by name
exports.findBrandsByName = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brands = await Brand.find({ Name: req.query.name });
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a brand by ID
exports.getBrandById = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brand = await Brand.findById(req.params.brandsId);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a brand by ID
exports.deleteBrandById = async (req, res) => {
  /*
   #swagger.tags = ['Brands']
  */
  try {
    const brand = await Brand.findByIdAndDelete(req.params.brandsId);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};