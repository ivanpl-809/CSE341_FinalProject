const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const mongooseToSwagger = require('mongoose-to-swagger');
const mongoose = require('mongoose');

// Import models
const partsModel = require('./models/partsModel');
const userModel = require('./models/userModel');
const vehicleModel = require('./models/vehicleModel');
const errorModel = require('./models/errorModel');
const brandModel = require('./models/brandModel');
const carDealerFranchiseModel = require('./models/carDealerFranchiseModel');
const aftermarketCompaniesModel = require('./models/aftermarketCompaniesModel');

// Convert Mongoose models to Swagger schemas
const partsSchema = mongooseToSwagger(partsModel);
const userSchema = mongooseToSwagger(userModel);
const vehicleSchema = mongooseToSwagger(vehicleModel);
const errorSchema = mongooseToSwagger(errorModel);
const brandSchema = mongooseToSwagger(brandModel);
const carDealerFranchiseSchema = mongooseToSwagger(carDealerFranchiseModel);
const aftermarketCompaniesSchema = mongooseToSwagger(aftermarketCompaniesModel);

// Swagger document configuration
const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Commercial Vehicle Information Database',
    description: 'Commercial Vehicle Information Database',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
    {
      url: 'https://your-render-app.onrender.com',
      description: 'Render server',
    },
  ],
  components: {
    schemas: {
      Part: partsSchema.properties,
      User: userSchema.properties,
      Vehicle: vehicleSchema.properties,
      Error: errorSchema.properties,
      Brand: brandSchema.properties,
      CarDealerFranchise: carDealerFranchiseSchema.properties,
      AftermarketCompanies: aftermarketCompaniesSchema.properties,
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger file
const generateSwaggerFile = async () => {
  await swaggerAutogen(outputFile, endpointsFiles, doc);
  console.log('Generated swagger file');
};

module.exports = generateSwaggerFile();