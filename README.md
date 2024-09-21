# Storefront Backend Project

## Required Technologies

This project use the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Setup database migration

- Implement [database.json](./database.json) and [.env](.env) file

```
db-migrate create users --sql-file
db-migrate create products --sql-file
db-migrate create orders --sql-file
db-migrate create order_products --sql-file

createdb full_stack_dev
psql -U postgres -d full_stack_dev
CREATE ROLE full_stack_user WITH LOGIN PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
sudo db-migrate up
```

### Software Design Patterns

In this project, I have used the `Singleton` and the `Reactor` design patterns.

`Singleton Pattern` restricts the instantiation of a class to a single instance and provides a global point of access to that instance. By ensuring that only one instance of the database connection exists, the Singleton Pattern prevents the overhead of creating multiple connections. This is important because each connection can consume resources and time.

- Global Access: The Singleton instance can be accessed globally throughout our application. This means that any part of our application that needs to interact with the database can do so through the same connection instance, ensuring consistency.

- Connection Pooling: While the Singleton Pattern itself doesn't implement connection pooling, it can be used in conjunction with pooling mechanisms. This means that you can manage a pool of connections efficiently while still using a Singleton to manage the pool itself.

- Thread Safety: In a multi-threaded environment, using a Singleton can help manage access to the database connection, ensuring that multiple threads don’t create their own connections simultaneously.

The `Reactor design pattern` is an architectural pattern used primarily in event-driven programming. It is designed to handle service requests that are delivered to an application by one or more clients. The pattern allows a system to react to events (such as incoming requests) without blocking the execution of other processes.

Event Demultiplexer: This is the core component that waits for events (like incoming network connections or user inputs) and dispatches them to the appropriate handlers. It monitors multiple sources of events and notifies the application when an event is ready to be processed.

Event Handlers: These are the components that contain the logic to handle specific events. Each handler is associated with a particular type of event (e.g., reading data from a socket, handling a user action).

Reactor: The reactor is the main component that coordinates the event demultiplexer and the event handlers. It registers handlers with the demultiplexer and invokes the appropriate handler when an event occurs.

- Scalability: It allows handling many connections without the overhead of multiple threads.
- Responsiveness: The system can respond to events as they occur, improving performance.
- Separation of Concerns: It separates the event handling logic from the event detection logic, making the code easier to manage and maintain.
