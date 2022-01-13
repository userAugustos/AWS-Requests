'use strict';

const app = require('../src/app');
const chai = require('chai');
const expect = chai.expect;
var context;

describe("Api resquest", () => {
  // let getSpy; para mockar requests, mas não necessario nesse GET


  it('Não passou o cep', async () => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {
        log: 'without cep'
      }
    };

    const result = await app.getAddress(event, context)

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(500);

    let response = JSON.parse(result.body);

    expect(response.message).to.be.equal("Você não passou nenhum endereço");
  });
  it('Passou o CEP', async () => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {
        cep: '08571090'
      }
    };

    const result = await app.getAddress(event, context)

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);

    let response = JSON.parse(result.body);

    expect(response.localidade).to.be.equal("Itaquaquecetuba");
  })
});