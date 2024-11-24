import request from "supertest";
import express from "express";
import orderRouteHandler from "../handlers/orderRouteHandler";
import { OrderModel } from "../models/order";
import { jest } from "@jest/globals";

// Mock OrderModel
class MockOrderModel {
  findAll() {
    return Promise.resolve([
      {
        id: 1,
        user_id: 1,
        totalAmount: 30.0,
        customerName: "User Name",
        status: "completed",
      },
    ]);
  }

  findById() {
    return Promise.resolve({
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    });
  }

  create() {
    return Promise.resolve({
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    });
  }

  update() {
    return Promise.resolve({
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    });
  }

  delete() {
    return Promise.resolve(true);
  }
}

describe("Order Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Middleware to parse JSON

    // Replace the OrderModel with the mock
    jest.mock("../models/order", () => ({
      OrderModel: MockOrderModel,
    }));

    orderRouteHandler(app); // Register the routes
  });

  it("GET /orders should return a list of orders", async () => {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);
  });

  it("GET /orders/:id should return a single order", async () => {
    const response = await request(app).get("/orders/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: "1",
      total_amount: "100.00",
      customer_name: "John Doe",
      status: "pending",
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
    const response = await request(app).delete("/orders/2");

    expect(response.status).toBe(204);
  });

  it("should handle errors gracefully", async () => {
    // Override the findAll method to simulate an error
    const originalFindAll = MockOrderModel.prototype.findAll;
    MockOrderModel.prototype.findAll = () =>
      Promise.reject(new Error("Database error"));

    const response = await request(app).get("/orders");

    expect(response.status).toBe(500);

    // Restore the original method
    MockOrderModel.prototype.findAll = originalFindAll;
  });
});
