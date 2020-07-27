require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Router = require('./routes/routes.js');
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/products', Router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}/products`)
);
