import request from "supertest";
import express from "express";
import orderRouteHandler from "../handlers/orderRouteHandler";
import { OrderModel } from "../models/order";

describe("Order Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Middleware to parse JSON
    orderRouteHandler(app); // Register the routes

    // Mocking the OrderModel methods
    spyOn(OrderModel.prototype, "findAll").and.returnValue(
      Promise.resolve([
        {
          id: 1,
          user_id: 1,
          totalAmount: 30.0,
          customerName: "User Name",
          status: "completed",
        },
      ]),
    );
    spyOn(OrderModel.prototype, "findById").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 1,
        totalAmount: 30.0,
        customerName: "User Name",
        status: "completed",
      }),
    );
    spyOn(OrderModel.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 1,
        totalAmount: 30.0,
        customerName: "User Name",
        status: "completed",
      }),
    );
    spyOn(OrderModel.prototype, "update").and.returnValue(
      Promise.resolve({
        id: 1,
        user_id: 1,
        totalAmount: 30.0,
        customerName: "User Name",
        status: "completed",
      }),
    );
    spyOn(OrderModel.prototype, "delete").and.returnValue(
      Promise.resolve(true),
    );
  });

  it("GET /orders should return a list of orders", async () => {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        user_id: 1,
        totalAmount: 30.0,
        customerName: "User Name",
        status: "completed",
      },
    ]);
  });

  it("GET /orders/:id should return a single order", async () => {
    const response = await request(app).get("/orders/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    });
  });

  it("POST /orders should create a new order", async () => {
    const newOrder = {
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    };
    const response = await request(app).post("/orders").send(newOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    });
  });

  it("PUT /orders/:id should update an existing order", async () => {
    const updatedOrder = {
      id: 1,
      user_id: 1,
      totalAmount: 20.0,
      customerName: "Bob Smith",
      status: "completed",
    };
    const response = await request(app).put("/orders/1").send(updatedOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: 1,
      totalAmount: 20.0,
      customerName: "Bob Smith",
      status: "completed",
    });
  });

  it("DELETE /orders/:id should delete an order", async () => {
    const response = await request(app).delete("/orders/1");

    expect(response.status).toBe(204);
  });

  it("should handle errors gracefully", async () => {
    spyOn(OrderModel.prototype, "findAll").and.callFake(() =>
      Promise.reject(new Error("Database error")),
    );

    const response = await request(app).get("/orders");

    expect(response.status).toBe(500);
  });
});
