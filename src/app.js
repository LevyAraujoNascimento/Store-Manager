const express = require('express');
const conn = require('./connection');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar ( teste )
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', async (_req, res) => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');
  res.status(200).json(result);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id', [id],
  );
  if (!result) {
    res.status(404).json({ message: 'Product not found' });  
  } else {
    res.status(200).json(result);  
  }
});

module.exports = app;