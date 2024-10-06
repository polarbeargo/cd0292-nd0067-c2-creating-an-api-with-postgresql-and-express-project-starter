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
});
