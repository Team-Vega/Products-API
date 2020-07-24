const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3030;
const Router = require('./routes/routes.js');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/products', Router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
