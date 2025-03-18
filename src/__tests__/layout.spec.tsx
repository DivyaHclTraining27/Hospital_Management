/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";

jest.mock(
  "../app/layout",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div>{children}</div>
);

describe("RootLayout", () => {
  it("renders correctly", () => {
    render(
      <RootLayout>
        <div data-testid="children-element">Test Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId("children-element")).toBeInTheDocument();
  });
});
