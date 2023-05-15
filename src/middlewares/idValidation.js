const { productsService } = require('../services');

let status = 200;

const existId = (itensSold) => { 
  let result = true;
  itensSold.forEach((item) => {
    const { productId } = item;
    if (!productId) {
      status = 400;
      result = '"productId" is required';
    }
  });
  return result;
};

const searchInStock = (itensSold, inStock) => {
  let searchResult = true;
  const { message } = inStock;
  itensSold.forEach((item) => {
    if (message.filter((element) => element.id === item.productId).length === 0) {
      status = 404;
      searchResult = 'Product not found';
    }
  });
  return searchResult;
};

const test = async (itensSold) => {
  const inStock = await productsService.listAll();
  
  const isIdReal = existId(itensSold);
  if (isIdReal !== true) return isIdReal;

  const isIdInStock = searchInStock(itensSold, inStock);
  if (isIdInStock !== true) return isIdInStock;
  
  return true;
};

const validProductId = async (req, res, next) => {
  const itensSold = req.body;
  const result = await test(itensSold);
  if (result === true) {
    next();
  } else {
    res.status(status).send({
      message: result,
    });
  }
};

module.exports = validProductId;