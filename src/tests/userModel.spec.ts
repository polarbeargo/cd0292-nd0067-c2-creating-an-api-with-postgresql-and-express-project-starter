import { UserModel } from "../models/user";
import database from "../database";
import { User } from "../models/interface";
import bcrypt from "bcrypt";

const userModel = new UserModel();

describe("UserModel", () => {
  beforeEach(() => {
    // Mock the database methods
    spyOn(database, "query").and.returnValue(undefined);
  });

  it("should have an index method", () => {
    expect(userModel.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userModel.create).toBeDefined();
  });

  it("should have an authenticate method", () => {
    expect(userModel.authenticate).toBeDefined();
  });

  it("should have an update method", () => {
    expect(userModel.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(userModel.delete).toBeDefined();
  });

  it("should have a show method", () => {
    expect(userModel.show).toBeDefined();
  });

  it("should create a new user", async () => {
    const result = await userModel.create({
      id: 1,
      username: "User Name",
      email: "user@example.com",
      password: "12345",
    });
    expect(result).toEqual({
      id: 1,
      username: "User Name",
      email: "user@example.com",
      password: "12345",
    });
  });

  it("should return all users", async () => {
    const users = await userModel.index();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    // Clean up the database after finishing the test run
    await database.query("DELETE FROM users");
  });
});
