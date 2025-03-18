import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Register from "@/components/Register";
import { SessionProvider } from "next-auth/react";

test("renders Register component", async () => {
  await act(async () => {
    render(
      <SessionProvider>
        <Register />
      </SessionProvider>
    );
  });
  const registerElement = screen.getByTestId("register");
  expect(registerElement).toBeInTheDocument();
});

test("renders name, email, and password fields", async () => {
  await act(async () => {
    render(
      <SessionProvider>
        <Register />
      </SessionProvider>
    );
  });
  const nameField = screen.getByTestId("name");
  const emailField = screen.getByTestId("email");
  const passwordField = screen.getByTestId("password");
  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
});

test("renders register button", async () => {
  await act(async () => {
    render(
      <SessionProvider>
        <Register />
      </SessionProvider>
    );
  });
  const registerButton = screen.getByTestId("register");
  expect(registerButton).toBeInTheDocument();
});

test("renders login link", async () => {
  await act(async () => {
    render(
      <SessionProvider>
        <Register />
      </SessionProvider>
    );
  });
  const loginLink = screen.getByTestId("anchor");
  expect(loginLink).toBeInTheDocument();
});
