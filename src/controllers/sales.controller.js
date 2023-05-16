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

const listAllSales = async (_req, res) => {
  const { type, message } = await salesService.listAll();
  if (type) {
    res.status(404).json(message);
  } else {
    res.status(200).json(message);
  }
};

const listSalesByID = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listByID(id);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(200).json(message);
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(204).end();
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const newItemsSold = req.body;
  const { type, message } = await salesService.updateSale(id, newItemsSold);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(200).json(message);
  }
};

module.exports = {
  newSale,
  listAllSales,
  listSalesByID,
  deleteSale,
  updateSale,
};
