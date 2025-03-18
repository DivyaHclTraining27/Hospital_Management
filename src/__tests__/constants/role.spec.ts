import { userTypes } from "@/constants/role";

describe("applicationStatus constant", () => {
  it("should contain the correct statuses", () => {
    expect(userTypes).toEqual(["job-seeker", "employer"]);
  });
});
