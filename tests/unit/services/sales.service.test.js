const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { allSales } = require('./mocks/sales.service.mock');

describe('Verificando service de Sales', function () {
  describe('listando todas as vendas:', function () {
    it('retorna a lista completa de vendas', async function () {
      // arrange
      sinon.stub(salesModel, 'listAll').resolves(allSales);

      // act
      const result = await salesService.listAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('Busca de uma venda', function () {

    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!
      // act
      const result = await salesService.listByID('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a venda não exista', async function () {
      // arrange
      sinon.stub(salesModel, 'listByID').resolves(undefined);
      // act
      const result = await salesService.listByID(1);
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('retorna o produto caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'listByID').resolves(allSales[0]);
      // act
      const result = await salesService.listByID(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSales[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});