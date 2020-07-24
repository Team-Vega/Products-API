const db = require('../models/queries');

module.exports = {
  getProductList: (req, res) => {
    //TODO: add the limit parameter here so that it doesn't have to be hard coded!
    db.queryProductList()
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log('there was an error querying product list: ', err);
        res.sendStatus(500);
      });
  },
  getProductInfo: (req, res) => {
    db.queryProductInfo([req.params.product_id])
      .then((results) => {
        res.json(results.rows);
      })
      .catch((err) => {
        console.log(
          `there was an error querying product id ${req.params.product_id}: `,
          err
        );
        res.sendStatus(500);
      });
  },
  getProductRelated: (req, res) => {
    // db.getProductList(someParams);
  },
  getProductStyles: (req, res) => {
    // db.getProductList(someParams);
  },
};
