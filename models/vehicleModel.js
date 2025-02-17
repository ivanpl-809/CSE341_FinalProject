const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  Brand: { type: String, required: true },
  Description: { type: String },
  Engine_type: { type: String, required: true },
  Fuel_type: { type: String, required: true },
  Name: { type: String, required: true },
  Transmission: { type: String, required: true },
  Year: { type: Number, required: true },
  Type: { type: String, required: true },
  colors_available: [{ type: String }],
});

module.exports = mongoose.model('Vehicle', vehicleSchema);