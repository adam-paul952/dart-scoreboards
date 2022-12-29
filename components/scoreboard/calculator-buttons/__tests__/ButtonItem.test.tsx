import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import ButtonItem from "../ButtonItem";

let mockFn = jest.fn();
// mockFn.mockImplementationOnce((title:string) => jest.fn())
const buttonProps = {
  item: "",
  onButtonPress: () => mockFn,
  disabled: undefined,
  variant: "",
  hits: undefined,
};

describe("<ButtonItem />", () => {
  afterEach(cleanup);

  it("should render a disabled button with no text", () => {
    const { getByA11yState } = render(<ButtonItem {...buttonProps} />);
    const button = getByA11yState({ disabled: true });
    // console.log(button.type);

    expect(button.props.accessibilityState).toStrictEqual({ disabled: true });
    expect(button.props.title).toMatch("");
  });

  it("should render the delete button", () => {
    const { getByRole } = render(<ButtonItem {...buttonProps} item="Del" />);

    const button = getByRole("button");
    expect(button.props.title).toMatch(/del/i);
  });

  it("should call the provided delete function", async () => {
    let title = "Del";
    // let newMock = new mockFn();
    // let buttonPress = (inputString:string) => jest.fn(inputString);
    const { getByRole } = render(
      <ButtonItem
        {...buttonProps}
        item={title}
        // onButtonPress={() => mockFn()}
      />
    );
    //   mockFn.mockImplementationOnce(() => jest.fn());
    // console.log(mockFn.mock);

    const button = getByRole("button");
    // console.log(button.props);
    // console.log(
    //   button.props.children[0]["_owner"].pendingProps.onPressOut.toString()
    // );
    //   expect(mockFn).not.toHaveBeenCalled();

    //   fireEvent.press(button);

    //   console.log(mockFn.mock);

    //   expect(mockFn).toHaveBeenCalled();

    // expect(button.props.onButtonPress).toHaveBeenCalled();
  });

  it("should render the enter button", () => {
    const { getByRole } = render(<ButtonItem {...buttonProps} item="Enter" />);

    const button = getByRole("button");
    expect(button.props.title).toMatch(/enter/i);
  });

  //   it("should call the provided handleSubmit function",()=>{
  //     const {getByRole}=render(<ButtonItem {...buttonProps} item="Enter"/>)
  //     const button = getByRole("button")
  //   });

  it("should render the hits if variant is cricket", () => {
    const { getByRole } = render(
      <ButtonItem {...buttonProps} item="1" hits={2} variant="cricket" />
    );

    const button = getByRole("button");
    const numHits =
      button.props.children[0].props.children[0].props.children.props.children
        .join()
        .replace(",", "");
    expect(button.props.title).toMatch(/1/i);
    expect(numHits).toMatch(/x2/i);
  });

  it("should render the hits if variant is killer", () => {
    const { getByRole } = render(
      <ButtonItem {...buttonProps} item="1" hits={3} variant="killer" />
    );

    const button = getByRole("button");
    const numHits =
      button.props.children[0].props.children[0].props.children.props.children
        .join()
        .replace(",", "");
    expect(button.props.title).toMatch(/1/i);
    expect(numHits).toMatch(/x3/i);
  });

  it("should render a regular button", () => {
    const { getByRole } = render(<ButtonItem {...buttonProps} item="3" />);

    const button = getByRole("button");
    expect(button.props.title).toMatch(/3/i);
  });
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
  // it("",()=>{});
});
