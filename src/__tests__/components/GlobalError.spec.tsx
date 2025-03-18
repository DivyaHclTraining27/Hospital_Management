import React from "react";
import { render, screen } from "@testing-library/react";
import GlobalError from "@/components/GlobalError";

describe("GlobalError", () => {
  it("renders children when there is no error", () => {
    render(
      <GlobalError>
        <div>Child Component</div>
      </GlobalError>
    );
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
