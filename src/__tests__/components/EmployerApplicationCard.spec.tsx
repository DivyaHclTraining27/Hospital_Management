import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import EmployerApplicationCard from "../../components/EmployerApplicationCard";
import { IApplication } from "@/interfaces/application";
import { IUser } from "@/interfaces/user";
import { customFetch } from "@/lib/api";
import { ObjectId } from "mongoose";
import { API, APPLICATIONS, PATCH } from "@/constants/api";

jest.mock("@/lib/api");

const mockApplicant: IUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  mobile: "1234567890",
  experience: "5 years",
  skills: ["JavaScript", "React", "Node.js"],
  password: "",
  role: "job-seeker",
};

const mockApplication: IApplication = {
  applicantId: mockApplicant,
  status: "pending",
  _id: "12345" as unknown as ObjectId,
  employerId: "sdf132545" as unknown as ObjectId,
  jobId: "bnlk234" as unknown as ObjectId,
};

describe("EmployerApplicationCard", () => {
  it("renders applicant details", () => {
    render(<EmployerApplicationCard {...mockApplication} />);
    expect(screen.getByText("Applicant Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("5 years")).toBeInTheDocument();
    expect(screen.getByText("JavaScript, React, Node.js")).toBeInTheDocument();
  });

  it("renders application status", () => {
    render(<EmployerApplicationCard {...mockApplication} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it('calls updateStatus with "selected" when Select button is clicked', async () => {
    (customFetch as jest.Mock).mockResolvedValue({ success: true });
    render(<EmployerApplicationCard {...mockApplication} />);
    const selectButton = screen.getByText("Select");
    fireEvent.click(selectButton);
    expect(customFetch).toHaveBeenCalledWith({
      path: `${API}/${APPLICATIONS}/12345`,
      method: PATCH,
      data: {
        status: "selected",
        applicantId: mockApplicant,
      },
    });
  });

  it('calls updateStatus with "rejected" when Reject button is clicked', async () => {
    (customFetch as jest.Mock).mockResolvedValue({ success: true });
    render(<EmployerApplicationCard {...mockApplication} />);
    const rejectButton = screen.getByText("Reject");
    fireEvent.click(rejectButton);
    expect(customFetch).toHaveBeenCalledWith({
      path: `${API}/${APPLICATIONS}/12345`,
      method: PATCH,
      data: {
        status: "rejected",
        applicantId: mockApplicant,
      },
    });
  });
});
