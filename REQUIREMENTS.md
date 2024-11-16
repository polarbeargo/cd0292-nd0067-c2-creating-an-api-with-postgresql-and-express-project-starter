# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- index: [GET] /products/:id
  - Description: Retrieve a specific product by ID.
- show: [GET] /products
  - Description: Retrieve a list of all products.
- create: [POST] /products
  - Description: Create a new product.
  - Authorization: Token required.
- update: [PUT] /products/:id
- delete: [DELETE] /products/:id

### Users

- index: [GET] /users/:id
  - Description: Retrieve a specific user by ID.
  - Authorization: Token required.
- show: [GET] /users
  - Description: Retrieve a list of all users.
  - Authorization: Token required.

- create: [POST] /users

  - Description: Create a new user.

- authenticate: [GET] users/:id/authenticate
  - Description: Authenticate a user by ID.
  - Authorization: Token required.

- update: [PUT] /users/:id
  - Description: Update an existing user by ID.
  - Authorization: Token required.

- delete: [DELETE] /users/:id
  - Description: Delete a user by ID.
  - Authorization: Token required.

### Orders

- show: [GET] /orders
  - Description: Retrieve a list of all orders.

- index: [GET] /orders/:id
  - Description: Retrieve a specific order by ID.

- create: [POST] /orders
  - Description: Create a new order.
  - Authorization: Token required.

- update: [PUT] /orders/:id
  - Description: Update an existing order by ID.
  - Authorization: Token required.

- delete: [DELETE] /orders/:id
  - Description: Delete an order by ID.
  - Authorization: Token required.

### Dashboard

- productsInOrders: [GET] /products_in_orders
  - Description: Retrieve products that are currently in orders.
- usersWithOrders: [GET] /users-with-orders
  - Description: Retrieve users who have placed orders.
- fiveMostExpensive [GET] /five-most-expensive
  - Description: Retrieve the top 5 most expensive products.

## Data Shapes

### Product

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
