CREATE TABLE PRODUCTS (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INTEGER,
  features JSON
);

CREATE TABLE RELATED (
  product_id INTEGER NOT NULL PRIMARY KEY,
  related_products JSON
);

CREATE TABLE STYLES (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER,
  name TEXT,
  sale_price TEXT,
  original_price INTEGER,
  default_style INTEGER,
  skus JSON,
  photos JSON,
  CONSTRAINT fk_styles
    FOREIGN KEY(product_id) REFERENCES PRODUCTS(id)
);