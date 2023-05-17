const { salesModel } = require('../models');
const schema = require('./validations/validationInputValues');

const createSale = async (itemsSold) => {
  const sale = await salesModel.createSale(itemsSold);
  return { type: null, message: sale };
};

const listAll = async () => { 
  const sales = await salesModel.listAll();
  return { type: null, message: sales };
};

const listByID = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const sale = await salesModel.listByID(id);
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;
  const sale = await salesModel.listByID(id);
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await salesModel.deleteSale(id);
  return { type: null };
};

module.exports = {
  createSale,
  listAll,
  listByID,
  deleteSale,
};