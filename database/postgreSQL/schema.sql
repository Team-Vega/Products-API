DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER NOT NULL,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INTEGER,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id INTEGER NOT NULL,
  current_product_id INTEGER,
  related_product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id INTEGER NOT NULL,
  product_id INTEGER,
  name TEXT,
  sale_price TEXT,
  original_price INTEGER,
  default_style INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT fk_styles
    FOREIGN KEY(product_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER NOT NULL,
  style_id INTEGER,
  size TEXT,
  quantity INTEGER,
  PRIMARY KEY (id),
  CONSTRAINT fk_skus
    FOREIGN KEY(style_id) REFERENCES styles(id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER NOT NULL,
  style_id INT,
  url TEXT,
  thumbnail_url TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_photos
    FOREIGN KEY(style_id) REFERENCES styles(id)
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER NOT NULL,
  product_id INTEGER,
  feature TEXT,
  value TEXT,
  PRIMARY KEY (id),
  CONSTRAINT fk_features
    FOREIGN KEY (product_id) REFERENCES products(id)
);