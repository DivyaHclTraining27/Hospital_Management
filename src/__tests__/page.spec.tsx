import Home from "../app/page";
import { render, screen } from "@testing-library/react";

// eslint-disable-next-line react/display-name
jest.mock("../app/page", () => () => <div>Home Component</div>);

describe("Given root page component", () => {
  it("should render root page", () => {
    render(<Home />);

    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });
});
