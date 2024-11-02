import request from "supertest";
import express from "express";
import productRouteHandler from "../handlers/productRouteHandler";
import { ProductModel } from "../models/product";

describe("Product Routes", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Middleware to parse JSON
    productRouteHandler(app); // Register the routes

    // Mocking the ProductModel methods
    spyOn(ProductModel.prototype, "index").and.returnValue(
      Promise.resolve([
        { id: 1, name: "Product A", price: 100, description: "Description" },
      ]),
    );
    spyOn(ProductModel.prototype, "show").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "Product A",
        price: 100,
        description: "Description",
      }),
    );
    spyOn(ProductModel.prototype, "create").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "Product A",
        price: 100,
        description: "Description",
      }),
    );
    spyOn(ProductModel.prototype, "update").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "Product A",
        price: 100,
        description: "Description",
      }),
    );
    spyOn(ProductModel.prototype, "delete").and.returnValue(
      Promise.resolve({
        id: 1,
        name: "Product A",
        price: 100,
        description: "Description",
      }),
    );
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

  it("should handle errors gracefully", async () => {
    spyOn(ProductModel.prototype, "index").and.returnValue(
      Promise.reject(new Error("Database error")),
    );

    const response = await request(app).get("/products");

    expect(response.status).toBe(500);
  });
});
