import React from "react";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CreateJob from "../../components/CreateJob";

jest.mock("@/lib/api");
jest.mock("next-auth/react");
jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
});
jest.mock("react-toastify");

const mockSession = {
  user: {
    id: "123",
    name: "Employer Name",
    role: "employer",
  },
};

describe("CreateJob", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the form fields", () => {
    render(<CreateJob />);
  });
});
