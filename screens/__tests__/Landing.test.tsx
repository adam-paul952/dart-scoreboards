import React from "react";
import { render } from "@testing-library/react-native";

import Landing from "../Landing";

describe("<Landing />", () => {
  it("should display the landing page", () => {
    const { getAllByRole } = render(<Landing />);

    const landingButtons = getAllByRole("button");

    expect(landingButtons).toHaveLength(4);
  });
});
