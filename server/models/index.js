const { Pool } = require('pg');
const pool = new Pool({
  user: 'me',
  // host: 'db',
  database: 'api2',
  password: 'password',
  port: 5432,
});

module.exports = pool;
