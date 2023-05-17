const chai = require('chai');

const sinon = require('sinon');

const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsService } = require('../../../src/services');

const { productsController } = require('../../../src/controllers');

const { products } = require('./mocks/products.controller.mock');


describe('Teste de unidade do productsController', function () {

  describe('Listando todos os produtos', function () {

    it('Deve retornar o status 200 e a lista', async function () {

      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'listAll')
        .resolves({ type: null, message: products });
      // act
      await productsController.listAllProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Buscando um produto', function () {

    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'listByID')
        .resolves({ type: null, message: products[0] });
      // Act
      await productsController.listProductsByID(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
  });

  /*
  describe('Buscando um produto por termo', function () {

    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        query: { q: 'Martelo' },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'searchProducts')
        .resolves({ type: null, message: products[0] });
      // Act
      await productsController.listProductsByID(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
  });

  describe('Deletando um produto', function () {

    it('deve responder com 204 quando deletar', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: null });
      // Act
      await productsController.deleteProduct(req, res);
      // Assert
      expect(res.status).to.have.been.calledWith(204);
      
    });
  });
  */
  afterEach(function () {
    sinon.restore();
  });
});