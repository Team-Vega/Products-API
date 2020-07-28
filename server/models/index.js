require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool({
  user: 'me',
  host: '18.219.239.209',
  database: 'api2',
  password: 'password',
  port: 5432,
});

module.exports = pool;
