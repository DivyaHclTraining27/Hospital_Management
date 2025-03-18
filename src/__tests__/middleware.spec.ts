import { withAuth } from "next-auth/middleware";
import { createMocks } from "node-mocks-http";

jest.mock("next-auth/middleware", () => ({
  withAuth: jest.fn((config) => config),
}));

describe("Auth Middleware", () => {
  it("should redirect to login page if not authenticated", async () => {
    const req = createMocks({ url: "/job/create" }).req;
    const res = createMocks().res;

    const middleware = withAuth({
      pages: {
        signIn: "/login",
        signOut: "/register",
      },
    });

    await middleware(req, res);

    expect(res._getRedirectUrl()).toBe("/login");
  });

  it("should allow access to authenticated routes", async () => {
    const req = createMocks({ url: "/applications" }).req;
    req.isAuthenticated = true; // Mock authenticated user
    const res = createMocks().res;

    const middleware = withAuth({
      pages: {
        signIn: "/login",
        signOut: "/register",
      },
    });

    await middleware(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it("should redirect to register page on sign out", async () => {
    const req = createMocks({ url: "/login" }).req;
    const res = createMocks().res;

    const middleware = withAuth({
      pages: {
        signIn: "/login",
        signOut: "/register",
      },
    });

    await middleware(req, res);

    expect(res._getRedirectUrl()).toBe("/login");
  });
});
