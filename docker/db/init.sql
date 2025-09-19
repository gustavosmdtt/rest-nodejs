CREATE DATABASE IF NOT EXISTS store;
USE store;

CREATE TABLE IF NOT EXISTS users (
  userId INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(55) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (userId)
);

CREATE TABLE IF NOT EXISTS products (
  productId INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (productId)
);

CREATE TABLE IF NOT EXISTS orders (
  orderId INT NOT NULL AUTO_INCREMENT,
  quantity SMALLINT NOT NULL,
  productId INT,
  PRIMARY KEY (orderId),
  FOREIGN KEY (productId) REFERENCES products(productId)
);

INSERT INTO users (email, password)
VALUES (
    'apiuser@foo.com',
    '$2b$10$3WwCGDBDXoGKPoJufHgaS.FigZVAqoxOXQXRccFEnj1u2.z4OwAbS'
);