const conn = require('./connection');

const listAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  return result;
};

const listByID = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id', [id],
  );
  return result;
};

const createProduct = async (name) => {
  const [result] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [name],
  );
  const newProduct = {
    id: result.insertId,
    name,
  };
  return newProduct;
};

const updateProduct = async (name, id) => {
  const [{ affectedRows }] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;', [id],
  );
};

module.exports = {
  listAll,
  listByID,
  createProduct,
  updateProduct,
  deleteProduct,
};