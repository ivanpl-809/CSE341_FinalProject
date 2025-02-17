// test/routes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server'); // Import your Express app
const Brand = require('../models/brandsModel'); // Import your models
const Vehicle = require('../models/vehicleModel');
const Part = require('../models/partsModel');
const AftermarketCompany = require('../models/aftermarketCompaniesModel');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET and GET All Routes', () => {
  beforeEach(() => {
    // Mock database responses
    sinon.stub(Brand, 'find').resolves([{ Name: 'Toyota', Country: 'Japan' }]);
    sinon.stub(Vehicle, 'find').resolves([{ Name: 'Corolla', Brand: 'Toyota' }]);
    sinon.stub(Part, 'find').resolves([{ Name: 'Brake Pads', Brand: 'Toyota' }]);
    sinon.stub(AftermarketCompany, 'find').resolves([{ Name: 'ABC Auto Parts', Country: 'USA' }]);
  });

  afterEach(() => {
    // Restore the original methods
    sinon.restore();
  });

  it('GET /brands should return all brands', async () => {
    const res = await chai.request(app).get('/brands');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('Name', 'Toyota');
  });

  it('GET /vehicles should return all vehicles', async () => {
    const res = await chai.request(app).get('/vehicle');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('Name', 'Corolla');
  });

  it('GET /parts should return all parts', async () => {
    const res = await chai.request(app).get('/parts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('Name', 'Brake Pads');
  });

  it('GET /aftermarketComp should return all aftermarket companies', async () => {
    const res = await chai.request(app).get('/aftermarketComp');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('Name', 'ABC Auto Parts');
  });
});