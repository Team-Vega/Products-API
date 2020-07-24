const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'db',
  database: 'api2',
  password: 'password',
  port: 5432,
});

module.exports = {
  getList: (someParams) => {
    //return some pool.query(SELECT * FROM products)
  },
  getInfo: (someParams) => {
    //return some pool.query(SELECT * FROM products WHERE id)
  },
  getRelated: (someParams) => {
    //return some pool.query(SELECT * FROM products WHERE related etc)
  },
  getStyles: (someParams) => {
    //return some pool.query(SELECT * FROM styles)
  },
  // getSkus: (req, res) => {
  //   pool.query(`SELECT * FROM skus`, (error, results) => {
  //     if (error) {
  //       console.log('error:', error);
  //     }
  //     res.status(200).json(results.rows);
  //   });
  // },
};
