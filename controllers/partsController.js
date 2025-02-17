const Part = require('../models/partsModel');

exports.createPart = async (req, res) => {
  try {
    const part = new Part(req.body);
    await part.save();
    res.status(201).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.status(200).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.status(200).json(part);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.status(200).json({ message: 'Part deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};