import request from "supertest";
import express from "express";
import productRouteHandler from "../handlers/productRouteHandler";
import { ProductModel } from "../models/product";
import { jest } from "@jest/globals";

// Define the type for the mock implementation of the ProductModel
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Create a mock implementation of the ProductModel
const mockProductModel = {
  index: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Product A", price: 100, description: "Description" },
    ]),
  ),
  show: jest.fn((id: number) => ({
    id,
    name: "Product A",
    price: 100,
    description: "Description",
  })),
  create: jest.fn((product: Product) => ({
    id: 1,
    name: "Product A",
    price: 100,
    description: "Description",
  })),
  update: jest.fn((id: number, product: Product) => ({
    id,
    name: "Product A",
    price: 100,
    description: "Description",
  })),
  delete: jest.fn(() => true),
};

// Replace the ProductModel with the mock in the tests
jest.mock("../models/product", () => ({
  ProductModel: jest.fn(() => mockProductModel),
}));

describe("Product Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Middleware to parse JSON
    productRouteHandler(app); // Register the routes
  });

  it("GET /products should return a list of products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: "Product A", price: 100, description: "Description" },
    ]);
  });

  it("GET /products/:id should return a single product", async () => {
    const response = await request(app).get("/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Product A",
      price: 100,
      description: "Description",
    });
  });

  it("POST /products should create a new product", async () => {
    const newProduct = {
      name: "Product A",
      price: 100,
      description: "Description",
    };
    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Product A",
      price: 100,
      description: "Description",
    });
  });

  it("PUT /products/:id should update an existing product", async () => {
    const updatedProduct = {
      name: "Updated Product A",
      price: 150,
      description: "Description",
    };
    const response = await request(app).put("/products/1").send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Product A",
      price: 100,
      description: "Description",
    });
  });

  it("DELETE /products/:id should delete a product", async () => {
    const response = await request(app).delete("/products/1");

    expect(response.status).toBe(204);
  });

  // it("should handle errors gracefully", async () => {
  //   (mockProductModel.index as jest.Mock<Promise<Product[]>, []>).mockRejectedValue(new Error("Database error"));

  //   const response = await request(app).get("/products");

  //   expect(response.status).toBe(500);
  // });
});
