import database from "../database"; // Import the Singleton instance
import { User } from "./interface";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const query = "SELECT * FROM users";
      const result = await database.query(query); // Use the singleton instance
      return result.rows;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }

  async create(user: User): Promise<User> {
    try {
      const query =
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string),
      );

      const values = [user.username, user.email, hash ];
      const result = await database.query(query, values);
      const u = result.rows[0]

      database.end()

      return u;
    } catch (error) {
      throw new Error(`unable create user (${user.username}): ${error}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const query = "SELECT password FROM users WHERE username = $1";
      const result = await database.query(query, [username]);
      console.log(password+pepper)
      if (result.rows.length) {
        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }

      return null;
    } catch (error) {
      throw new Error("Failed to authenticate user");
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      const query =
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
      const values = [user.username, user.email, id];
      const result = await database.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const query = "DELETE FROM users WHERE id = $1";
      const values = [id];
      await database.query(query, values);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }

  async show(id: number): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE id = $1";
      const values = [id];
      const result = await database.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
}
