import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import CalculatorButtons from "../CalculatorButtons";
import { cricketButtons, regularButtons } from "../constants";

const buttonProps = {
  variant: "",
  value: undefined,
  setValue: undefined,
  disabled: undefined,
  onHandleSubmit: () => {},
  onDeleteInput: () => {},
  hitTargets: undefined,
};

const killerTwoPlayers = [2, 1];
const killerThreePlayers = [9, 4, 3];
const killerFourPlayers = [1, 8, 2, 11];
const killerFivePlayers = [12, 1, 6, 3, 2];
const killerSevenPlayers = [6, 4, 2, 9, 10, 14, 12];

describe("<CalculatorButtons />", () => {
  beforeEach(cleanup);

  describe("render the calculator buttons", () => {
    it("displays the regular calculator buttons", () => {
      const { getAllByRole } = render(
        <CalculatorButtons {...buttonProps} variant="baseball" />
      );

      const buttons = getAllByRole("button");

      expect(buttons).toHaveLength(12);
      buttons.forEach((button, index) => {
        expect(button.props.title).toStrictEqual(regularButtons[index]);
      });
    });

    it("displays the cricket calculator buttons", () => {
      const { getAllByRole } = render(
        <CalculatorButtons {...buttonProps} variant="cricket" />
      );

      const buttons = getAllByRole("button");

      expect(buttons).toHaveLength(9);
      buttons.forEach((button, index) => {
        expect(button.props.title).toStrictEqual(cricketButtons[index]);
      });
    });

    it.each([
      [2, killerTwoPlayers],
      [3, killerThreePlayers],
      [4, killerFourPlayers],
      [5, killerFivePlayers],
      [7, killerSevenPlayers],
    ])(
      "displays the killer calculator buttons for %i players",
      (numPlayers, input) => {
        // console.log(`Input: `, input);
        const { getAllByRole, queryAllByA11yState } = render(
          <CalculatorButtons
            {...buttonProps}
            variant="killer"
            playerTargets={input}
          />
        );

        const buttons = getAllByRole("button");
        const enterDelete = buttons.filter(
          (button) =>
            button.props.title === "Enter" || button.props.title === "Del"
        ).length;
        const disabledButtons = queryAllByA11yState({ disabled: true }).length;
        const emptyButtons = buttons.filter(
          (button) => button.props.title === ""
        ).length;

        expect(disabledButtons).toBe(emptyButtons);

        expect(buttons).toHaveLength(numPlayers + emptyButtons + enterDelete);
      }
    );
  });

  describe("button onPress", () => {
    it("should call the provided delete input function", async () => {
      const mockOnDeleteInput = jest.fn();
      render(
        <CalculatorButtons
          {...buttonProps}
          variant="baseball"
          onDeleteInput={mockOnDeleteInput}
        />
      );
      expect(mockOnDeleteInput).not.toHaveBeenCalled();

      // const deleteButton = screen.getByRole("button", { name: /del/i });

      // expect(deleteButton).toBeTruthy();

      // fireEvent(deleteButton, "press");
      // // screen.debug();
      // console.log(deleteButton);
      // await waitFor(() => {
      //   console.log(mockOnDeleteInput.mock);
      //   // expect(mockOnDeleteInput).toHaveBeenCalledWith("Del");
      // });
    });
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
  });

  describe("assign hits to button", () => {
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
  });
  describe("assign disabled", () => {
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
    // it("",()=>{})
  });
});
// import {Pressable, Text} from 'react-native'

// render(
//   <Pressable accessibilityRole="button" disabled>
//     <Text>Hello</Text>
//   </Pressable>
// );
// const element = screen.getByRole('button');
// const element2 = screen.getByRole('button', { name: 'Hello' });
// const element3 = screen.getByRole('button', { name: 'Hello', disabled: true });
