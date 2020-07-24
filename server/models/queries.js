const { Pool } = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'db',
  database: 'api2',
  password: 'password',
  port: 5432,
});

module.exports = {
  queryProductList: () => {
    return pool.query('SELECT * FROM products limit 5');
  },
  queryProductInfo: (params) => {
    return pool.query(
      'SELECT * FROM products INNER JOIN features ON (products.product_id && features.product_id = $1)',
      params
    );
  },
  queryRelated: (someParams) => {
    //return some pool.query(SELECT * FROM products WHERE related etc)
  },
  queryStyles: (someParams) => {
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
