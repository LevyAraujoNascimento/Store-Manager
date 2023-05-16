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

const createProduct = async (name) => {
  const product = await productsModel.createProduct(name);
  return { type: null, message: product };
};

const updateProduct = async (name, id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const updatedProduct = await productsModel.updateProduct(name, id);
  if (updatedProduct < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const result = { id, name };
  return { type: null, message: result };
};

const deleteProduct = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const product = await productsModel.listByID(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null };
};

const searchProducts = async (searchTerm) => { 
  const products = await productsModel.listAll();
  const filteredProducts = products.filter((product) => product.name.includes(searchTerm));
  return { type: null, message: filteredProducts };
};

module.exports = {
  listAll,
  listByID,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};