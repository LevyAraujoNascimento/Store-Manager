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

const listAll = async () => {
  const [result] = await conn.execute(
    `SELECT 
       sales.id AS saleId,
       sales.date,
       sales_products.product_id AS productId,
       sales_products.quantity
     FROM 
       StoreManager.sales AS sales
     INNER JOIN StoreManager.sales_products AS sales_products
     ON sales_products.sale_id = sales.id;
    `,
  );

  return result;
};

const listByID = async (id) => {
  const [result] = await conn.execute(
    `SELECT 
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
    FROM 
      StoreManager.sales AS sales
    INNER JOIN StoreManager.sales_products AS sales_products
    ON sales_products.sale_id = sales.id
    WHERE
      sales.id = ?
    ORDER BY sales_products.sale_id ASC;
  `, [id],
  );

  return result;
};

const deleteSale = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;', [id],
  );
};

const updateSale = async (id, newItemsSold) => {
  await deleteSale(id);
  const result = await createSale(newItemsSold);
  return result;
};

module.exports = {
  createSale,
  listAll,
  listByID,
  deleteSale,
  updateSale,
};