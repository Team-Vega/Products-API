CREATE TABLE skus (
  id serial PRIMARY KEY,
  style_id integer NOT NULL,
  size TEXT,
  quantity integer
);