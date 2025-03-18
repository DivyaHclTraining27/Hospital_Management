import React from "react";
import { render, screen } from "@testing-library/react";
import { ObjectId } from "mongoose";

import ApplicationCard from "../../components/ApplicationCard";
import { IApplication } from "@/interfaces/application";
import { IJob } from "@/interfaces/job";

const mockJob: IJob = {
  title: "Software Engineer",
  employer: { name: "Tech Corp", id: "123sfd" as unknown as ObjectId },
  description: "Develop and maintain web applications.",
  location: "Bengaluru, India",
  salary: "50000",
  noOfPosition: "5",
};

const mockApplication: IApplication = {
  jobId: mockJob,
  status: "pending",
  createdAt: new Date("2023-03-17"),
  employerId: "sughkj328789" as unknown as ObjectId,
  applicantId: "dasguyh687" as unknown as ObjectId,
};

test("renders job title", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByText("Software Engineer")).toBeInTheDocument();
});

test("renders employer name", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByText("Tech Corp")).toBeInTheDocument();
});

test("renders job description", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(
    screen.getByText("Develop and maintain web applications.")
  ).toBeInTheDocument();
});

test("renders job location", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByText("Bengaluru, India")).toBeInTheDocument();
});

test("renders job salary", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByTestId("salaryDiv")).toBeInTheDocument();
});

test("renders application status", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByText("Pending")).toBeInTheDocument();
});

test("renders application created date", () => {
  render(<ApplicationCard {...mockApplication} />);
  expect(screen.getByText("Posted on: Fri Mar 17 2023")).toBeInTheDocument();
});
