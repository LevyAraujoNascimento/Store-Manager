const express = require('express');
const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const validName = require('./middlewares/nameValidation');
const validProductId = require('./middlewares/idValidation');
const validQuant = require('./middlewares/quantValidation');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar ( teste )
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.get('/products', productsController.listAllProducts);

app.get('/products/:id', productsController.listProductsByID);

app.post('/products', validName, productsController.newProduct);

app.put('/products/:id', validName, productsController.updateProduct);

app.delete('/products/:id', productsController.deleteProduct);

app.get('/sales', salesController.listAllSales);

app.get('/sales/:id', salesController.listSalesByID);

app.post('/sales', validProductId, validQuant, salesController.newSale);

app.delete('/sales/:id', salesController.deleteSale);

module.exports = app;