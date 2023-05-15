const { productsService } = require('../services');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsService.listAll();
  if (type) {
    res.status(404).json(message);
  } else {
    res.status(200).json(message);
  }
};

const listProductsByID = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.listByID(id);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(200).json(message);
  }
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(201).json(message);
  }
};
module.exports = {
  listAllProducts,
  listProductsByID,
  newProduct,
};