/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL, -- Using DECIMAL for currency
    description TEXT
);

-- Insert some products
INSERT INTO products (name, price, description) VALUES ('Product 1', 100.00, 'Description of Product 1');
INSERT INTO products (name, price, description) VALUES ('Product 2', 50.00, 'Description of Product 2');