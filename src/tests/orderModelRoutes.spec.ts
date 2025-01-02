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
    console.log("Mock create called");
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
    const response = await request(app).get("/orders/3");

    expect(response.status).toBe(200);
  });

  it("POST /orders should create a new order", async () => {
    const newOrder = {
      user_id: 4,
      total_amount: "30.00",
      customer_name: "ACME Inc.",
      status: "completed",
    };
    const response = await request(app).post("/orders").send(newOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user_id: 1,
      total_amount: "30.00",
      customer_name: "ACME Inc",
      status: "completed",
    });
  });

  it("PUT /orders/:id should update an existing order", async () => {
    const updatedOrder = {
      id: 3,
      user_id: "3",
      total_amount: "20.00",
      customer_name: "Bob Smith",
      status: "completed",
    };
    const response = await request(app).put("/orders/3").send(updatedOrder);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 3,
      user_id: "3",
      total_amount: "20.00",
      customer_name: "Bob Smith",
      status: "completed",
    });
  });

  it("DELETE /orders/:id should delete an order", async () => {
    const response = await request(app).delete("/orders/d/2");

    expect(response.status).toBe(204);
  });

  it("should handle errors gracefully", async () => {
    jest
      .spyOn(OrderModel.prototype, "findAll")
      .mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/orders");

    expect(response.status).toBe(500);
  });
});
