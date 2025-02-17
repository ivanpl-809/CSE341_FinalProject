const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  Brand: { type: String, required: true },
  Name: { type: String, required: true },
  Quality: { type: String, enum: ['OEM', 'Aftermarket', 'Used'], required: true },
  Vehicles: [{ type: String }],
});

module.exports = mongoose.model('Part', partSchema);