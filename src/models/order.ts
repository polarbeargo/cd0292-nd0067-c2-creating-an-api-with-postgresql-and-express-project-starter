import database from "../database"; // Import the Singleton instance
import { Order, OrderItem } from "./interface";

export class OrderModel {
  async create(order: Order): Promise<Order> {
    const sql =
      "INSERT INTO orders (id, user_id, total_amount, customer_name, status) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [order.id, order.userId, order.totalAmount, order.customerName, order.status];
    try {
      const result = await database.query(sql, values); // Use the Singleton instance to query
      return result.rows[0];
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Could not create order");
    }
  }

  async findById(id: number): Promise<Order | null> {
    const sql = "SELECT * FROM orders WHERE id = $1";
    try {
      const result = await database.query(sql, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw new Error(`Could not retrieve order with id ${id}`);
    }
  }

  async findAll(): Promise<Order[]> {
    const sql = "SELECT * FROM orders";
    try {
      const result = await database.query(sql);
      return result.rows;
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw new Error("Could not retrieve orders");
    }
  }

  async update(id: number, order: Order): Promise<Order | null> {
    const sql =
      "UPDATE orders SET customer_name = $1, total_amount = $2 WHERE id = $3 RETURNING *";
    const values = [order.userId, order.status, id];
    try {
      const result = await database.query(sql, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error updating order with id ${id}:`, error);
      throw new Error(`Could not update order with id ${id}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const sql = "DELETE FROM orders WHERE id = $1";
    try {
      await database.query(sql, [id]);
      return true;
    } catch (error) {
      console.error(`Error deleting order with id ${id}:`, error);
      throw new Error(`Could not delete order with id ${id}`);
    }
  }
}

export class OrderItemModel {
  async create(orderItem: OrderItem): Promise<OrderItem> {
    const sql =
      "INSERT INTO order_items (order_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      orderItem.orderId,
      orderItem.productId,
      orderItem.quantity,
      orderItem.price,
    ];
    try {
      const result = await database.query(sql, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating order item:", error);
      throw new Error("Could not create order item");
    }
  }

  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    const sql = "SELECT * FROM order_items WHERE order_id = $1";
    try {
      const result = await database.query(sql, [orderId]);
      return result.rows;
    } catch (error) {
      console.error(
        `Error fetching order items for order id ${orderId}:`,
        error,
      );
      throw new Error(`Could not retrieve order items for order id ${orderId}`);
    }
  }

  async update(id: number, orderItem: OrderItem): Promise<OrderItem | null> {
    const sql =
      "UPDATE order_items SET product_name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *";
    const values = [
      orderItem.productId,
      orderItem.quantity,
      orderItem.price,
      id,
    ];
    try {
      const result = await database.query(sql, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Error updating order item with id ${id}:`, error);
      throw new Error(`Could not update order item with id ${id}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const sql = "DELETE FROM order_items WHERE id = $1";
    try {
      await database.query(sql, [id]);
      return true;
    } catch (error) {
      console.error(`Error deleting order item with id ${id}:`, error);
      throw new Error(`Could not delete order item with id ${id}`);
    }
  }
}
