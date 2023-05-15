const { salesService } = require('../services');

const newSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await salesService.createSale(itemsSold);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(201).json(message);
  }
};

module.exports = {
  newSale,
};
