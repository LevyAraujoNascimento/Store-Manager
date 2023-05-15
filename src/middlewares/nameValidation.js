let status = 200;

const test = (name) => {
  const limit = 5;
  if (!name) {
    status = 400;
    return '"name" is required';
  }
  if (name.length < limit) {
    status = 422;
    return '"name" length must be at least 5 characters long';
  }
  return true;
};

const validName = (req, res, next) => {
  const { name } = req.body;
  const result = test(name);
  if (result === true) {
    next();
  } else {
    res.status(status).send({
      message: result,
    });
  }
};

module.exports = validName;