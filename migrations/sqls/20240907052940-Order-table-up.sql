/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to User
    total_amount DECIMAL(10, 2) NOT NULL, -- Total amount of the order
    customer_name VARCHAR(100) NOT NULL, -- Name of the customer
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed')) -- Restricting status values
);

-- Insert an order for the newly created user (assuming the user_id is 2)
INSERT INTO orders (id, user_id, total_amount, customer_name, status) VALUES (1, 1, 100.00, 'John Doe', 'pending');
INSERT INTO orders (id, user_id, total_amount, customer_name, status) VALUES (2, 2, 50.00, 'Jane Smith', 'completed'); 
INSERT INTO orders (id, user_id, total_amount, customer_name, status) VALUES (3, 3, 75.00, 'Alice Johnson', 'completed');