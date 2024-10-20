/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to User
    total_amount DECIMAL(10, 2) NOT NULL, -- Total amount of the order
    customer_name VARCHAR(100) NOT NULL, -- Name of the customer
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed')) -- Restricting status values
);