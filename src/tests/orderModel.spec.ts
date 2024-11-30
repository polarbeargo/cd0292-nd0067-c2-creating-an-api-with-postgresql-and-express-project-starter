import { OrderModel, OrderItemModel } from "../models/order";
import { OrderItem } from "../models/interface";
import { Order } from "../models/interface";
import { UserModel } from "../models/user";
describe("OrderModel", () => {
  const userModel = new UserModel();
  const orderModel = new OrderModel();
  const orderItemModel = new OrderItemModel();
  let testOrderItem: OrderItem;

  it("should have a create method", () => {
    expect(orderModel.create).toBeDefined();
  });

  it("should have a findById method", () => {
    expect(orderModel.findById).toBeDefined();
  });

  it("should have a findAll method", () => {
    expect(orderModel.findAll).toBeDefined();
  });

  it("should have an update method", () => {
    expect(orderModel.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderModel.delete).toBeDefined();
  });

  it("create method should add an order", async () => {
    const newOrder: Order = {
      id: 1,
      user_id: 1,
      totalAmount: 30.0,
      customerName: "User Name",
      status: "completed",
    };
    const result = await orderModel.create(newOrder);
    expect(result).not.toBeNull();
    if (result !== null) {
      expect(result.user_id.toString()).toEqual(newOrder.user_id.toString());
      expect(result.status).toEqual(newOrder.status);
    }
  });

  it("findById method should return the correct order", async () => {
    const result = await orderModel.findById(2);
    expect(result).toBeDefined();
    if (result !== null) {
      expect(result.id).toEqual(2);
    }
  });

  it("findAll method should return a list of orders", async () => {
    const result = await orderModel.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("update method should modify the order", async () => {
    const updatedOrder: Order = {
      id: 1,
      user_id: 1,
      totalAmount: 40.0,
      customerName: "Updated User",
      status: "shipped",
    };
    const result = await orderModel.update(1, updatedOrder);
    expect(result).not.toBeNull();
    expect(result!.status).toEqual(updatedOrder.status);
  });

  it("delete method should remove the order", async () => {
    const result = await orderModel.delete(1);
    expect(result).toBe(true);
  });
});
