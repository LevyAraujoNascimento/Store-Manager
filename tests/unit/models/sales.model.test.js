const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de Vendas', function () {

  it('Listando todas as vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.listAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Listando uma venda por ID', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[sales[0]]]);
    // Act
    const [result] = await salesModel.listByID(1);
    // Assert
    expect(result).to.be.deep.equal(sales[0]);
  });
  /*
  it('Criando um novo produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    // Act
    const result = await productsModel.createProduct('Espada do Blade');
    // Assert
    expect(result).to.be.deep.equal({ id: 4, name: 'Espada do Blade' });
  });
  */
  afterEach(function () {
    sinon.restore();
  });
});