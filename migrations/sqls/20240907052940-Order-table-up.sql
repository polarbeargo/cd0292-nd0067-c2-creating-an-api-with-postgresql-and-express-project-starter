/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to User
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed')) -- Restricting status values
);