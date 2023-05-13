const { productsModel } = require('../models');
const schema = require('./validations/validationInputValues');

const listAll = async () => {
  const products = await productsModel.listAll();
  return { type: null, message: products };
};

const listByID = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const product = await productsModel.listByID(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  listAll,
  listByID,
};