import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react-native";

import ButtonItem from "../ButtonItem";

const buttonProps = {
  item: "",
  onButtonPress: () => {},
  disabled: undefined,
  variant: "",
  hits: undefined,
};

describe("<ButtonItem />", () => {
  afterEach(cleanup);

  it("should render a disabled button with no text", () => {
    render(<ButtonItem {...buttonProps} />);
    const button = screen.getByA11yState({ disabled: true });

    expect(button.props.accessibilityState).toStrictEqual({ disabled: true });
    expect(button.props.title).toMatch("");
  });

  it("should render the delete button", () => {
    render(<ButtonItem {...buttonProps} item="Del" />);

    const button = screen.getByRole("button");
    expect(button.props.title).toMatch(/del/i);
  });

  it("should call the provided delete function", async () => {
    let title = "Del";
    let buttonPress = jest.fn();

    render(
      <ButtonItem {...buttonProps} item={title} onButtonPress={buttonPress} />
    );

    const button = screen.getByRole("button");

    fireEvent(button, "pressOut");

    await waitFor(() => {
      expect(buttonPress.mock.calls[0][0]).toMatch(title);
    });
  });

  it("should render the enter button", () => {
    const { getByRole } = render(<ButtonItem {...buttonProps} item="Enter" />);

    const button = getByRole("button");
    expect(button.props.title).toMatch(/enter/i);
  });

  it("should call the provided handleSubmit function", async () => {
    let item = "Enter";
    let buttonPress = jest.fn();
    render(
      <ButtonItem {...buttonProps} item={item} onButtonPress={buttonPress} />
    );
    const button = screen.getByRole("button");

    fireEvent(button, "pressOut");

    await waitFor(() => {
      expect(buttonPress.mock.calls[0][0]).toMatch(item);
    });
  });

  it("should render the hits if variant is cricket", () => {
    render(<ButtonItem {...buttonProps} item="1" hits={2} variant="cricket" />);

    const button = screen.getByRole("button");
    const numHits =
      button.props.children[0].props.children[0].props.children.props.children
        .join()
        .replace(",", "");
    expect(button.props.title).toMatch(/1/i);
    expect(numHits).toMatch(/x2/i);
  });

  it("should render the hits if variant is killer", () => {
    render(<ButtonItem {...buttonProps} item="1" hits={3} variant="killer" />);

    const button = screen.getByRole("button");
    const numHits =
      button.props.children[0].props.children[0].props.children.props.children
        .join()
        .replace(",", "");
    expect(button.props.title).toMatch(/1/i);
    expect(numHits).toMatch(/x3/i);
  });

  it("should render a regular button", () => {
    render(<ButtonItem {...buttonProps} item="3" />);

    const button = screen.getByRole("button");
    expect(button.props.title).toMatch(/3/i);
  });

  it("should call the button function if variant is killer or cricket", async () => {
    let title = "1";
    const buttonPress = jest.fn();
    render(
      <ButtonItem {...buttonProps} item={title} onButtonPress={buttonPress} />
    );

    const button = screen.getByRole("button");

    fireEvent(button, "pressOut");

    await waitFor(() => {
      expect(buttonPress.mock.calls[0][0]).toMatch(title);
    });
  });

  it("should call the function for a regular button", async () => {
    let title = "3";
    const buttonPress = jest.fn();
    render(
      <ButtonItem {...buttonProps} item={title} onButtonPress={buttonPress} />
    );

    const button = screen.getByRole("button");

    fireEvent(button, "pressOut");
    fireEvent(button, "pressOut");

    await waitFor(() => {
      expect(
        buttonPress.mock.calls[0].concat(buttonPress.mock.calls[1]).join("")
      ).toBe("33");
    });
  });
});
