/* Replace with your SQL commands */
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, -- Foreign key to Order
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, -- Foreign key to Product
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL -- Storing price at the time of order
);