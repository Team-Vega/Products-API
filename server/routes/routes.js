const Router = require('express').Router();
const controllers = require('../controllers/controllers.js');

Router.get('/', function (req, res) {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});
Router.get('/list', controllers.getProductList);
Router.get('/:product_id', controllers.getProductInfo);
Router.get('/:product_id/styles', controllers.getProductStyles);
Router.get('/:product_id/related', controllers.getProductRelated);

module.exports = Router;
