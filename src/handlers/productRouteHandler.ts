import { verifyAuthToken } from "../middleware";
import express, { Request, Response, NextFunction } from "express";
import { Product } from "../models/interface";
import { ProductModel } from "../models/product";

const productModel = new ProductModel();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.show(Number(req.params.id));
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    const newProduct = await productModel.create(product);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    const updatedProduct = await productModel.update(
      Number(req.params.id),
      product,
    );
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`Attempting to delete product with ID: ${req.params.id}`);
  try {
    await productModel.delete(Number(req.params.id));
    console.log(`Product with ID: ${req.params.id} deleted successfully.`);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    next(error);
  }
};

const productRouteHandler = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.put("/products/:id", verifyAuthToken, update);
  app.delete("/products/d/:id", verifyAuthToken, destroy);
};

export default productRouteHandler;
