let status = 200;

const existQuant = (itensSold) => {
  let result = true;
  itensSold.forEach((item) => {
    const { quantity } = item;
    if (quantity === undefined) {
      status = 400;
      result = '"quantity" is required';
    }
  });
  return result;
};

const rightQuant = (itensSold) => {
  let quantResult = true;
  itensSold.forEach((item) => {
    if (item.quantity <= 0) {
      status = 422;
      quantResult = '"quantity" must be greater than or equal to 1';
    }
  });
  return quantResult;
};

const test = (itensSold) => {
  const isQuantReal = existQuant(itensSold);
  if (isQuantReal !== true) return isQuantReal;

  const isQuantRight = rightQuant(itensSold);
  if (isQuantRight !== true) return isQuantRight;

  return true;
};

const validQuant = (req, res, next) => {
  const itensSold = req.body;
  const result = test(itensSold);
  if (result === true) {
    next();
  } else {
    res.status(status).send({
      message: result,
    });
  }
};

module.exports = validQuant;