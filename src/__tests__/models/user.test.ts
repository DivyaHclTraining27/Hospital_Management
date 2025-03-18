import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import User from "../../models/user";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model", () => {
  it("should hash the password before saving", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    await user.save();

    const savedUser = await User.findOne({ email: "john.doe@example.com" });
    expect(savedUser).toBeDefined();
    expect(savedUser?.password).not.toBe("password123");
    const isMatch = await bcrypt.compare(
      "password123",
      savedUser?.password || ""
    );
    expect(isMatch).toBe(true);
  });

  it("should match the password correctly", async () => {
    const user = new User({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
    });

    await user.save();

    const isMatch = await user.matchPassword("password123");
    expect(isMatch).toBe(true);

    const isNotMatch = await user.matchPassword("wrongpassword");
    expect(isNotMatch).toBe(false);
  });

  it("should not hash the password if it is not modified", async () => {
    const user = new User({
      name: "Alice",
      email: "alice@example.com",
      password: "password123",
    });

    await user.save();

    user.name = "Alice Updated";
    await user.save();

    const savedUser = await User.findOne({ email: "alice@example.com" });
    expect(savedUser).toBeDefined();
    const isMatch = await bcrypt.compare(
      "password123",
      savedUser?.password || ""
    );
    expect(isMatch).toBe(true);
  });
});
