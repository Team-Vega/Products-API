const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3030;
const db = require('./models/queries');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) =>
  res.json({ info: 'Node.js, Express, and Postgres API' })
);

app.get('/users', db.getSkus);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
