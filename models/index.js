const partsModel = require('./partsModel');
const vehicleModel = require('./vehicleModel');
const aftermarketCompaniesModel = require('./aftermarketCompaniesModel'); 
const dbConfig = require('../utils');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.parts = require('./partsModel')(mongoose);
db.vehicles = require('./vehicleModel')(mongoose);
db.aftermarketCompanies = require('./aftermarketCompaniesModel')(mongoose); 

module.exports = {
  db,
  partsModel,
  vehicleModel,
  aftermarketCompaniesModel, 
};