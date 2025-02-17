const mongoose = require('mongoose');

const aftermarketCompanySchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Address: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country: { type: String, required: true },
  Brands: [{ type: String }],
  CertifiedMechanics: { type: Number, required: true },
  Vehicles: [{ type: String }],
});

module.exports = mongoose.model('AftermarketCompany', aftermarketCompanySchema);