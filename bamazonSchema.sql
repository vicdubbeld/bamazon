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
        (1, "Coffee mug", 10, 200000),
        (2, "Hoodie", 50, 10000),
        (3, "HydroFlask", 25, 10000),
        (4, "Laptop", 1500, 75000),
        (5, "Airpods", 150, 20000),
        (6, "Notebook", 25, 85000),
        (7, "Backpack", 180, 10000),
        (8, "Pen", 5, 200000)
    
