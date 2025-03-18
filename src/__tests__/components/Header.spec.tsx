import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Header from "../../components/Header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

describe("Header component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({ data: null });
  });

  it("renders the header component", () => {
    render(<Header />);
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  it("renders the Naukri.com logo and navigates to home on click", () => {
    render(<Header />);
    const logoButton = screen.getByText("Naukri.com");
    fireEvent.click(logoButton);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders Register and Login buttons when no session", () => {
    render(<Header />);
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("navigates to register page on Register button click", () => {
    render(<Header />);
    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);
    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("navigates to login page on Login button click", () => {
    render(<Header />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("renders user info and Sign out button when session exists", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe", role: "job-seeker" } },
    });
    render(<Header />);
    expect(screen.getByText("User type: job-seeker")).toBeInTheDocument();
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("navigates to Application status page for job-seeker role", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe", role: "job-seeker" } },
    });
    render(<Header />);
    const applicationStatusButton = screen.getByText("Application status");
    fireEvent.click(applicationStatusButton);
    expect(mockPush).toHaveBeenCalledWith("/applications");
  });

  it("navigates to Create job page for non-job-seeker role", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Jane Doe", role: "employer" } },
    });
    render(<Header />);
    const createJobButton = screen.getByText("Create job");
    fireEvent.click(createJobButton);
    expect(mockPush).toHaveBeenCalledWith("/job/create");
  });
});
