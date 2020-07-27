const db = require('../models/queries');

module.exports = {
  getProductList: (req, res) => {
    db.queryProductList(req.query.count, req.query.page)
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('there was an error returning product list: ', err);
        res.sendStatus(500);
      });
  },
  getProductInfo: (req, res) => {
    let params = [req.params.product_id];
    db.queryProductInfo(params)
      .then((results) => {
        res.json(results.rows[0]);
      })
      .catch((err) => {
        console.log(
          `there was an error returning product info for prod_id ${params}: `,
          err
        );
        res.sendStatus(500);
      });
  },
  getProductStyles: (req, res) => {
    let params = [req.params.product_id];
    db.queryStyles(params)
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log(
          `there was an error returning styles for prod_id ${params}: `,
          err
        );
        res.sendStatus(500);
      });
  },
  getProductRelated: (req, res) => {
    let params = [req.params.product_id];
    db.queryRelated(params)
      .then((results) => {
        res.json(results.rows[0].array_agg);
      })
      .catch((err) => {
        console.log(
          `there was an error returning related products for prod_id ${params}: `,
          err
        );
        res.sendStatus(500);
      });
  },
};
