/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Using DECIMAL for currency
    description TEXT
);