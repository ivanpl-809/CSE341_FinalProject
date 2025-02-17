const AftermarketCompany = require('../models/aftermarketCompaniesModel');

// Create an aftermarket company
exports.createAftermarketCompany = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const company = new AftermarketCompany(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an aftermarket company
exports.updateAftermarketCompany = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const company = await AftermarketCompany.findByIdAndUpdate(
      req.params.aftermarketId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: 'Aftermarket company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all aftermarket companies
exports.getAftermarketCompanies = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const companies = await AftermarketCompany.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find aftermarket companies by brand
exports.findAftermarketCompaniesByBrand = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const companies = await AftermarketCompany.find({ Brands: req.query.brand });
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Find aftermarket companies by vehicle
exports.findAftermarketCompaniesByVehicle = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const companies = await AftermarketCompany.find({ Vehicles: req.query.vehicle });
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get an aftermarket company by ID
exports.getAftermarketCompanyById = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const company = await AftermarketCompany.findById(req.params.aftermarketId);
    if (!company) return res.status(404).json({ message: 'Aftermarket company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an aftermarket company by ID
exports.deleteAftermarketCompanyById = async (req, res) => {
  /*
   #swagger.tags = ['AftermarketCompanies']
  */
  try {
    const company = await AftermarketCompany.findByIdAndDelete(req.params.aftermarketId);
    if (!company) return res.status(404).json({ message: 'Aftermarket company not found' });
    res.status(200).json({ message: 'Aftermarket company deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};