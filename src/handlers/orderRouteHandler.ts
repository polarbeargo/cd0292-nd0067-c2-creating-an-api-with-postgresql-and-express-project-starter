import { verifyAuthToken } from "../middleware";
import express, { Request, Response, NextFunction } from "express";
import { Order, OrderItem } from "../models/interface";
import { OrderModel } from "../models/order";

const orderModel = new OrderModel();
const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.findById(Number(req.params.id));
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = req.body;
    const newOrder = await orderModel.create(order);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = req.body;
    const updatedOrder = await orderModel.update(Number(req.params.id), order);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderModel.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const orderRouteHandler = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, destroy);
};

export default orderRouteHandler;
