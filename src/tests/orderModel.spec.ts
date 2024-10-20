import { OrderModel, OrderItemModel } from "../models/order";
import { OrderItem } from "../models/interface";
import { Order } from "../models/interface";
describe("OrderModel", () => {
  const orderModel = new OrderModel();
  const orderItemModel = new OrderItemModel();
  let testOrderItem: OrderItem;
  let testOrder: Order;

  beforeAll(async () => {
    testOrder = {
      id: 0,
      userId: 1,
      totalAmount: 20.0,
      customerName: "Test User",
      status: "pending",
    };
    const createdOrder = await orderModel.create(testOrder);
    testOrder.id = createdOrder.id;

    testOrderItem = {
      id: 0,
      orderId: testOrder.id,
      productId: 1,
      quantity: 2,
      price: 10.0,
    };
    const createdOrderItem = await orderItemModel.create(testOrderItem);
    testOrderItem.id = createdOrderItem.id;
  });

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
      userId: 2,
      totalAmount: 30.0,
      customerName: "New User",
      status: "completed",
    };
    const result = await orderModel.create(newOrder);
    expect(result.userId).toEqual(newOrder.userId);
    expect(result.status).toEqual(newOrder.status);
  });

  it("findById method should return the correct order", async () => {
    const result = await orderModel.findById(testOrder.id);
    expect(result).toBeDefined();
    if (result !== null) {
      expect(result.id).toEqual(testOrder.id);
    }
  });

  it("findAll method should return a list of orders", async () => {
    const result = await orderModel.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("update method should modify the order", async () => {
    const updatedOrder: Order = {
      id: testOrder.id,
      userId: 3,
      totalAmount: 40.0,
      customerName: "Updated User",
      status: "shipped",
    };
    const result = await orderModel.update(testOrder.id, updatedOrder);
    expect(result).not.toBeNull();
    expect(result!.status).toEqual(updatedOrder.status);
  });

  it("delete method should remove the order", async () => {
    const result = await orderModel.delete(testOrder.id);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    // Clean up the test database
    if (testOrderItem && testOrderItem.id) {
      await orderItemModel.delete(testOrderItem.id); // Assuming the order item has an id property
    }
    if (testOrder && testOrder.id) {
      await orderModel.delete(testOrder.id);
    }
  });
});
