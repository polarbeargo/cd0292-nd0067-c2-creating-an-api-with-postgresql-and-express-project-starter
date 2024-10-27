/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Assuming the hashed password will be stored here
);

-- Insert a user
INSERT INTO users (id, username, email, password) VALUES (1, 'John Doe', 'user@example.com', 'hashed_password');
INSERT INTO users (id, username, email, password) VALUES (2, 'Jane Smith', 'jane@example.com', 'hashed_password');
INSERT INTO users (id, username, email, password) VALUES (3, 'Alice Johnson', 'alice@example.com', 'hashed_password');

