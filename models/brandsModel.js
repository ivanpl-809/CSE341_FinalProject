const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Country: { type: String, required: true },
  StartingDate: { type: Date, required: true },
  Logo: { type: String }, // Base64 encoded image
  Headquarters: { type: String, required: true },
  Founders: [{ type: String, required: true }], // Array of founder names
  CreatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Brand', brandSchema, 'Brands');