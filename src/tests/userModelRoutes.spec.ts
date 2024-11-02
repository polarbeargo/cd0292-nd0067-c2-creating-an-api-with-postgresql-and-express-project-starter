import request from "supertest";
import express from "express";
import userRouteHandler from "../handlers/userRouteHandler";
import { UserModel } from "../models/user";

describe("User Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Middleware to parse JSON
    userRouteHandler(app); // Register the routes
    spyOn(UserModel.prototype, "index").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john@example.com",
          password: "hashed_password",
        },
      ]),
    );
    spyOn(UserModel.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed_password",
      }),
    );
    spyOn(UserModel.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed_password",
      }),
    );
    spyOn(UserModel.prototype, "update").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed_password",
      }),
    );
    spyOn(UserModel.prototype, "delete").and.returnValue(Promise.resolve());
  });

  it("GET /users should return a list of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed_password",
      },
    ]);
  });

  it("GET /users/:id should return a single user", async () => {
    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password",
    });
  });

  it("POST /users should create a new user", async () => {
    const response = await request(app).post("/users").send({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password",
    });
  });

  it("PUT /users/:id should update an existing user", async () => {
    const response = await request(app).put("/users/1").send({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password",
    });
  });

  it("DELETE /users/:id should delete a user", async () => {
    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(204);
  });

  it("should handle errors gracefully", async () => {
    spyOn(UserModel.prototype, "index").and.callFake(() =>
      Promise.reject(new Error("Database error")),
    );

    const response = await request(app).get("/users");

    expect(response.status).toBe(500);
  });
});
