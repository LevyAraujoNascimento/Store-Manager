const { salesModel } = require('../models');

const createSale = async (itemsSold) => {
  const sale = await salesModel.createSale(itemsSold);
  return { type: null, message: sale };
};

module.exports = {
  createSale,
};