const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Vehicle = require('../models/vehicleModel');

chai.use(chaiHttp);
const { expect } = chai;

describe('Vehicle Routes', () => {
  before(async () => {
    await Vehicle.deleteMany({});
  });

  it('should get all vehicles', async () => {
    const res = await chai.request(server).get('/vehicles');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});