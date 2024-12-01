import Database from "../database"; // Import the Singleton instance
import { Product } from "./interface";

export class ProductModel {
  private conn = Database; // Use the Singleton instance

  async index(): Promise<Product[]> {
    const sql = "SELECT * FROM products";
    try {
      const result = await this.conn.query(sql); // Use the Singleton instance to query
      return result.rows;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Could not retrieve products");
    }
  }

  async show(id: number): Promise<Product> {
    const sql = "SELECT * FROM products WHERE id = $1";
    try {
      const result = await this.conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new Error(`Could not retrieve product with id ${id}`);
    }
  }

  async create(product: Product): Promise<Product> {
    const sql =
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
    try {
      const result = await this.conn.query(sql, [
        product.name,
        product.price,
        product.description,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Could not create product");
    }
  }

  async update(id: number, product: Product): Promise<Product> {
    const sql =
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *";
    try {
      const result = await this.conn.query(sql, [
        product.name,
        product.price,
        product.description,
        id,
      ]);
      console.log("Executing SQL:", sql, [
        product.name,
        product.price,
        product.description,
        id,
      ]);

      if (result.rows.length === 0) {
        throw new Error(`No product found with id ${id}`);
      }

      return result.rows[0];
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw new Error(`Could not update product with id ${id}`);
    }
  }

  async delete(id: number): Promise<Product> {
    const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
    try {
      const result = await this.conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new Error(`Could not delete product with id ${id}`);
    }
  }
}
