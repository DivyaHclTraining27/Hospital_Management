import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";

import Login from "../../components/Login";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Login component", () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
    (useSession as jest.Mock).mockReturnValue({ data: null });
  });

  it("renders the login component", () => {
    render(<Login />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders email and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("renders login button", () => {
    render(<Login />);
    expect(screen.getByTestId("loginBtn")).toBeInTheDocument();
  });

  it("renders register link", () => {
    render(<Login />);
    expect(screen.getByText(/Click here to Register/i)).toBeInTheDocument();
  });

  it("validates user login on form submit", async () => {
    render(<Login />);
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByTestId("loginBtn"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "password",
      });
    });
  });

  it("shows success toast and redirects on successful login", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "user@example.com" } },
    });
    render(<Login />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Login successful");
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("does not show success toast or redirect if session is null", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<Login />);

    await waitFor(() => {
      expect(toast.success).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
