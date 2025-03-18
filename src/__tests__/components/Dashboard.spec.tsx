import fetchMock from "jest-fetch-mock";

import { render, } from "@testing-library/react";
import Dashboard from "../../components/Dashboard";
import { IJob } from "@/interfaces/health";
import { ObjectId } from "mongoose";

fetchMock.enableMocks();

describe("Dashboard Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should render the dashboard component", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

    render(<Dashboard />);
  });

  it("should display jobs when data is fetched", async () => {
    const jobs: IJob[] = [
      {
        _id: "1" as unknown as ObjectId,
        title: "Job 1",
        description: "Description 1",
        location: "",
        salary: "",
        noOfPosition: "",
        employer: "11323rjjk" as unknown as ObjectId,
      },
      {
        _id: "2" as unknown as ObjectId,
        title: "Job 2",
        description: "Description 2",
        location: "",
        salary: "",
        noOfPosition: "",
        employer: "ibdksnikjdsh132433" as unknown as ObjectId,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify({ data: jobs }));

    render(<Dashboard />);
  });
});
