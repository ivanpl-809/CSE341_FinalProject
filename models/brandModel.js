const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Country: { type: String, required: true },
  Founders: { type: String, required: true },
  Headquarters: { type: String, required: true },
  Logo: { type: String, required: true },
  StartingDate: { type: String, required: true },
});

module.exports = mongoose.model('Brand', brandSchema);