import React from "react";

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import CreatePlayer from "../CreatePlayer";
import { NavigationContainer } from "@react-navigation/native";

const component = (
  <NavigationContainer>
    <CreatePlayer />
  </NavigationContainer>
);

describe("<CreatePlayer />", () => {
  it("should display the create player screen", () => {
    //   render(component);
    //   // const header = screen.getByText("Create Player");
    //   const text = screen.getByText("Enter Name:");
    //   const input = screen.getByPlaceholderText("Player name");
    //   const button = screen.getByText("Add Player");
    //   // expect(header).toBeTruthy();
    //   expect(text).toBeTruthy();
    //   expect(input).toBeTruthy();
    //   expect(button).toBeTruthy();
    // });
    // it("should enter text into the input area", () => {
    //   render(component);
    //   const input = screen.getByPlaceholderText("Player name");
    //   waitFor(() => {
    //     fireEvent.changeText(input, "Test User");
    //   });
    //   // expect(input).toBe("Test User");
  });
});
