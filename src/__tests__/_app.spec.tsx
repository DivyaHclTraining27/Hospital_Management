import React from "react";
import { render } from "@testing-library/react";
import { SessionProvider } from "../__tests__/__mocks__/SessionProvider";



test("renders component with mock session", () => {
  const { getByText } = render(
    <SessionProvider>
      <div>hi</div>
    </SessionProvider>
  );

  expect(getByText(/hi/i)).toBeInTheDocument();
});
