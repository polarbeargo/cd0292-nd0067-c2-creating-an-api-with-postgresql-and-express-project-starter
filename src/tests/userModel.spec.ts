import { UserModel } from "../models/user";
import database from "../database";
import { User } from "../models/interface";
import bcrypt from "bcrypt";
import { jest } from "@jest/globals";

// Create a mock implementation of the database query method
const mockDatabase: { query: jest.Mock<any> } = {
  query: jest.fn(),
};

const userModel = new UserModel();

describe("UserModel", () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockDatabase.query.mockReset();
    database.query = mockDatabase.query as unknown as typeof database.query; // Replace the original database query with the mock
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
    // Mock the create method's database query response
    mockDatabase.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          username: "User Name",
          email: "user@example.com",
          password: "hashed_password", // Assuming password is hashed
        },
      ],
    });

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
      password: "hashed_password", // Adjust according to your actual implementation
    });
  });

  it("should return all users", async () => {
    // Mock the index method's database query response
    mockDatabase.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          username: "User Name",
          email: "user@example.com",
          password: "hashed_password",
        },
      ],
    });

    const users = await userModel.index();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    // Clean up the database after finishing the test run
    await database.query("DELETE FROM users");
  });
});
