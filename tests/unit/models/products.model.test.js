const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { products, newProducts, deletedProducts } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de Produtos', function () {

  it('Listando todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.listAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });
  
  it('Listando um produto por ID', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productsModel.listByID(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Criando um novo produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    // Act
    const result = await productsModel.createProduct('Espada do Blade');
    // Assert
    expect(result).to.be.deep.equal({ id: 4, name: 'Espada do Blade' });
  });
  /*
  it('Deletando produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.listAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });
  */
  afterEach(function () {
    sinon.restore();
  });
});