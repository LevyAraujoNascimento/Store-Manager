const chai = require('chai');

const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesService } = require('../../../src/services');

const { salesController } = require('../../../src/controllers');

const { allSales } = require('./mocks/sales.controller.mock');


describe('Teste de unidade do salesController', function () {

  describe('Listando todas as vendas', function () {

    it('Deve retornar o status 200 e a lista', async function () {

      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'listAll')
        .resolves({ type: null, message: allSales });
      // act
      await salesController.listAllSales(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('Buscando uma venda', function () {

    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'listByID')
        .resolves({ type: null, message: allSales[0] });
      // Act
      await salesController.listSalesByID(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });

});