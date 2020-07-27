const pool = require('./index');

module.exports = {
  queryProductList: (count = 5, page = 1) => {
    return pool
      .connect()
      .then((client) => {
        let query = 'SELECT * FROM products LIMIT $1 OFFSET $2';
        client.release();
        return client.query(query, [count, page * count - count]);
      })
      .catch((err) => {
        console.log(`there was an error in querying products`, err);
        client.release();
      });
  },
  queryProductInfo: (productId) => {
    return pool
      .connect()
      .then((client) => {
        let query = `SELECT *,
        (
          SELECT array_to_json(array_agg(feature_cols))
          FROM (
            SELECT feature, value 
            FROM features
            WHERE features.product_id = products.product_id
          ) feature_cols
        ) AS features
        FROM products
        WHERE products.product_id = $1;`;
        client.release();
        return client.query(query, productId);
      })
      .catch((err) => {
        console.log(
          `there was an error in querying product: ${productId}`,
          err
        );
        client.release();
      });
  },
  queryStyles: (productId) => {
    return pool.connect().then((client) => {
      let query = `SELECT row_to_json(t)
      FROM (
        SELECT products.product_id,
          ( 
          SELECT array_to_json(array_agg(results_col))
            FROM (
              SELECT styles.style_id, styles.name, styles.original_price, styles.sale_price, styles.default,
              (
                SELECT array_to_json(array_agg(row_to_json(photo_cols)))
                FROM (
                  SELECT thumbnail_url, url 
                  FROM photos
                  WHERE photos.style_id = styles.style_id
                ) photo_cols
              ) AS photos,
              (
                SELECT jsonb_object_agg(size, quantity)
                FROM skus
                WHERE skus.style_id = styles.product_id
              ) AS skus
            FROM styles
            WHERE styles.product_id = products.product_id
          ) results_col
        ) AS results
        FROM products
        WHERE products.product_id = $1
      ) t;`;
      return client
        .query(query, productId)
        .then((results) => {
          client.release();
          return results;
        })
        .catch((err) => {
          console.log(
            `there was an error in querying product: ${productId}`,
            err
          );
          client.release();
        });
    });
  },
  queryRelated: (productId) => {
    return pool
      .connect()
      .then((client) => {
        let query = `SELECT array_agg(related_product_id)
        FROM related
        WHERE related.current_product_id = $1`;
        client.release();
        return client.query(query, productId);
      })
      .catch((err) => {
        console.log(`there was an error in querying related`, err);
        client.release();
      });
  },
};
