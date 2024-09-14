import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

class Database {
  private static instance: Database;
  private client: Pool;

  private constructor() {
    // Use the appropriate database based on the ENV variable
    const database = ENV === "test" ? POSTGRES_TEST_DB : POSTGRES_DB;

    this.client = new Pool({
      host: POSTGRES_HOST,
      database: database,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getClient(): Pool {
    return this.client;
  }
}

export default Database.getInstance().getClient();
