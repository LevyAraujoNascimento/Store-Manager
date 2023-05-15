const conn = require('./connection');

const createSale = async (itemsSold) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  itemsSold.forEach(async (element) => {
    await conn.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [insertId, element.productId, element.quantity],
    );
  });
  const newSale = {
    id: insertId,
    itemsSold,
  };
  return newSale;
};

module.exports = {
  createSale,
};