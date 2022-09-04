import React from "react";
import { cleanup, render } from "@testing-library/react-native";

import CustomButton from "../CustomButton";

const buttonTitle = "Test Button";

describe("<CustomButton />", () => {
  afterEach(cleanup);

  it("should render a button with text", () => {
    const { getByText, getByRole } = render(
      <CustomButton title={buttonTitle} />
    );

    getByText(buttonTitle);
    expect(getByRole("button")).toBeDefined();
  });

  it("should contain the correct title", () => {
    const { getByRole } = render(<CustomButton title={buttonTitle} />);

    const button = getByRole("button");
    expect(button).not.toContain("Text");
  });

  it("should be selected if selected is true", () => {
    const { getByA11yState } = render(
      <CustomButton title={buttonTitle} selected />
    );

    const selectedButton = getByA11yState({ selected: true });
    expect(selectedButton).toBeDefined();
  });

  it("should not be selected", () => {
    const { getByA11yState } = render(<CustomButton title={buttonTitle} />);

    const notSelectedButton = getByA11yState({ selected: false });
    expect(notSelectedButton).toBeDefined();
  });

  it("should be disabled if disabled is true", () => {
    const { getByA11yState } = render(
      <CustomButton title={buttonTitle} disabled />
    );

    const disabled = getByA11yState({ disabled: true });
    expect(disabled).toBeDefined();
  });

  it("should not be disabled", () => {
    const { getByA11yState } = render(<CustomButton title={buttonTitle} />);

    const notDisabled = getByA11yState({ disabled: false });
    expect(notDisabled).toBeDefined();
  });
});
