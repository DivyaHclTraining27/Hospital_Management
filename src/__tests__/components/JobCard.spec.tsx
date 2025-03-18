import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import JobCard from "../../components/JobCard";
import { customFetch } from "@/lib/api";
import { IJob } from "@/interfaces/job";
import { ObjectId } from "mongoose";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  customFetch: jest.fn(),
}));

describe("JobCard component", () => {
  const mockPush = jest.fn();
  const mockReload = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({ data: null });
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
      writable: true,
    });
  });

  const job: IJob = {
    _id: "1" as unknown as ObjectId,
    title: "Software Engineer",
    description: "Job description",
    employer: { name: "Tech Company", id: "hjlkl31233" as unknown as ObjectId },
    location: "Remote",
    noOfPosition: "5",
    salary: "50000",
    allApplicants: [],
    createdAt: new Date(),
  };

  it("renders the job card component", () => {
    render(<JobCard {...job} />);
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders job details correctly", () => {
    render(<JobCard {...job} />);
    expect(screen.getByText("Job description")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(`₹ ${job.salary}`)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(job.createdAt as Date).toDateString())
    ).toBeInTheDocument();
  });

  it("renders Apply button for job-seeker role", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "user1", role: "job-seeker", email: "user@example.com" },
      },
    });
    render(<JobCard {...job} />);
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });

  it("renders View Applications button for employer role", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "user1", role: "employer", email: "user@example.com" },
      },
    });
    render(<JobCard {...job} />);
    expect(screen.getByText("View Applications")).toBeInTheDocument();
  });

  it("calls applyJob function on Apply button click", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "user1", role: "job-seeker", email: "user@example.com" },
      },
    });
    (customFetch as jest.Mock).mockResolvedValue({ data: job });
    render(<JobCard {...job} />);
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);
    expect(customFetch).toHaveBeenCalledWith({
      path: `api/jobs/${job._id}`,
      method: "PATCH",
      data: { userId: "user1" },
    });
    await screen.findByText("Applied");
    expect(mockReload).toHaveBeenCalled();
  });

  it("navigates to job details page on View Applications button click", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "user1", role: "employer", email: "user@example.com" },
      },
    });
    render(<JobCard {...job} />);
    const viewApplicationsButton = screen.getByText("View Applications");
    fireEvent.click(viewApplicationsButton);
    expect(mockPush).toHaveBeenCalledWith(`/job/${job._id}`);
  });

  it("disables Apply button if user has already applied", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { id: "user1", role: "job-seeker", email: "user@example.com" },
      },
    });
    const jobWithApplicant = {
      ...job,
      allApplicants: ["user1" as unknown as ObjectId],
    };
    render(<JobCard {...jobWithApplicant} />);
    const applyButton = screen.getByText("Applied");
    expect(applyButton).toBeDisabled();
  });
});
