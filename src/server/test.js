/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index';
// Configure chai
const { expect } = chai;
chai.use(chaiHttp);
describe('credit cards', () => {
  // Test to get all credit card records
  it('should get all credit card records', (done) => {
    chai.request(app)
      .get('/api/getAll')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  // Test add a valid credit card
  it('should add a credit card record', (done) => {
    chai.request(app)
      .post('/api/add')
      .send({
        cardNumber: '4532012937625444', name: 'Alice', balance: '2300', limit: '3000'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  // Test add an invalid credit card
  it('should add a credit card record', (done) => {
    chai.request(app)
      .post('/api/add')
      .send({
        cardNumber: '453201291110000037625444', name: 'Alice', balance: '2300', limit: '3000'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
