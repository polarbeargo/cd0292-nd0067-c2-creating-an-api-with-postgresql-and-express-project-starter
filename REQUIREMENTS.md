# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user [args: user id](token required)
- [OPTIONAL] Completed Orders by user [args: user id](token required)

## Data Shapes

#### Product

```
- id SERIAL PRIMARY KEY,
- name VARCHAR(100) NOT NULL,
- price DECIMAL(10, 2) NOT NULL, -- Using DECIMAL for currency
- description TEXT
```

#### User

```
- id SERIAL PRIMARY KEY,
- username VARCHAR(100) NOT NULL,
- email VARCHAR(255) NOT NULL UNIQUE,
- password VARCHAR(255) NOT NULL (Assuming the hashed password will be stored here)
```

#### Orders

```
- id SERIAL PRIMARY KEY,
- user_id bigint REFERENCES users(id) ON DELETE CASCADE, (Foreign key to User)
- total_amount DECIMAL(10, 2) NOT NULL, (Total amount of the order)
- customer_name VARCHAR(100) NOT NULL, (Name of the customer)
- status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed')) (Restricting status values)
```

#### Order Items

```
- id SERIAL PRIMARY KEY,
- order_id bigint REFERENCES orders(id) ON DELETE CASCADE, (Foreign key to Order)
- product_id bigint REFERENCES products(id) ON DELETE CASCADE, (Foreign key to Product)
- quantity INTEGER NOT NULL,
- price DECIMAL(10, 2) NOT NULL (Storing price at the time of order)
```
