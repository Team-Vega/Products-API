require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Router = require('./routes/routes.js');
const port = process.env.PORT;
const token = 'loaderio-a39c596e737aac30cea275cb33dea677';

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get(`/${token}`, function (req, res) {
  res.send(token);
});

app.use('/products', Router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}/products`)
);
