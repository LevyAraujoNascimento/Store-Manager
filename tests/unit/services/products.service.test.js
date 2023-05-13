const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProducts } = require('./mocks/products.service.mock');

describe('Verificando service de Products', function () {
  describe('listando todas as pessoas:', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'listAll').resolves(allProducts);

      // act
      const result = await productsService.listAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('Busca de um produto', function () {

    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
      // act
      const result = await productsService.listByID('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModel, 'listByID').resolves(undefined);
      // act
      const result = await productsService.listByID(1);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(productsModel, 'listByID').resolves(allProducts[0]);
      // act
      const result = await productsService.listByID(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});