import { loginSchema } from "@/schemas/loginSchema";

describe("loginSchema", () => {
  it("should validate a valid email and password", async () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };

    await expect(loginSchema.validate(validData)).resolves.toBe(validData);
  });

  it("should invalidate an invalid email", async () => {
    const invalidData = {
      email: "invalid-email",
      password: "password123",
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(
      "Invalid email"
    );
  });

  it("should invalidate a missing email", async () => {
    const invalidData = {
      email: "",
      password: "password123",
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(
      "Email is Required"
    );
  });

  it("should invalidate a missing password", async () => {
    const invalidData = {
      email: "test@example.com",
      password: "",
    };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(
      "Password is Required"
    );
  });

  it("should invalidate an empty object", async () => {
    const invalidData = { email: "", password: "" };

    await expect(loginSchema.validate(invalidData)).rejects.toThrow(
      "Email is Required"
    );
  });
});
