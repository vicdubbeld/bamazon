DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (item_id, product_name, price, stock_quantity)
    VALUES
        (1, "Coffee mug", 10, 200),
        (2, "Hoodie", 50, 100),
        (3, "HydroFlask", 25, 100),
        (4, "Laptop", 1500, 75),
        (5, "Airpods", 150, 20),
        (6, "Notebook", 25, 85),
        (7, "Backpack", 180, 10),
        (8, "Pen", 5, 200),
        (9, "Hardrive", 100, 50),
        (10, "Charging Hub", 75, 100);
        