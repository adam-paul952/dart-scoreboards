import React from "react";
import { render, screen } from "@testing-library/react-native";

import CustomButton from "../CustomButton";

const buttonTitle = "Test Button";

describe("<CustomButton />", () => {
  it("should render a button with a title", () => {
    render(<CustomButton title={buttonTitle} />);

    expect(screen.getByRole("button")).toBeDefined();
  });

  it("should contain the correct title", () => {
    render(<CustomButton title={buttonTitle} />);

    const button = screen.getByRole("button");
    expect(button).not.toContain("Text");
  });

  it("should be selected if selected is true", () => {
    render(<CustomButton title={buttonTitle} selected />);

    const selectedButton = screen.getByA11yState({ selected: true });
    expect(selectedButton).toBeDefined();
  });

  it("should not be selected", () => {
    render(<CustomButton title={buttonTitle} />);

    const notSelectedButton = screen.getByRole("button", {
      selected: false,
    });

    expect(notSelectedButton).toBeDefined();
  });

  it("should be disabled if disabled is true", () => {
    render(<CustomButton title={buttonTitle} disabled />);

    const disabled = screen.getByA11yState({ disabled: true });
    expect(disabled).toBeDefined();
  });

  it("should not be disabled", () => {
    render(<CustomButton title={buttonTitle} />);

    const notDisabled = screen.getByRole("button", { disabled: false });
    expect(notDisabled).toBeDefined();
  });
});
