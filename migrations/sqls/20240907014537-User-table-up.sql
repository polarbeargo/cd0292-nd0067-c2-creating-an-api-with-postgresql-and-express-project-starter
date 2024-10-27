/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- Assuming the hashed password will be stored here
);

-- Insert a user
INSERT INTO users (username, email, password) VALUES ( 'John Doe', 'user@example.com', 'hashed_password');
INSERT INTO users (username, email, password) VALUES ( 'Jane Smith', 'jane@example.com', 'hashed_password');
INSERT INTO users (username, email, password) VALUES ('Alice Johnson', 'alice@example.com', 'hashed_password');

