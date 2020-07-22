const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'db',
  database: 'api',
  password: 'password',
  port: 5432,
});

const getUsers = (req, res) => {
  pool.query(`SELECT * FROM skus`, (error, results) => {
    if (error) {
      console.log('error:', error);
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
};
