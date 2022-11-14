import React from "react";

import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import PlayerItem from "../PlayerItem";

const player = { id: 1, name: "Test User" };
const deletePlayer = jest.fn();
const togglePlayerSelect = jest.fn();

const component = (
  <PlayerItem
    player={player}
    deletePlayer={deletePlayer}
    togglePlayerSelect={togglePlayerSelect}
  />
);

describe("<PlayerItem />", () => {
  it("should render the player row", () => {
    // render(component);
    // const playerButton = screen.getByText("Test User");
    // const checkbox = screen.getByRole("checkbox");
    // expect(playerButton).toBeDefined();
    // expect(checkbox).toBeDefined();
  });

  //   it("should toggle a player being selected", async () => {
  //     render(component);

  //     waitFor(() => {
  //       const playerButton = screen.getByText("Test User");
  //       fireEvent(playerButton, "press");
  //     });

  //     expect(togglePlayerSelect).toHaveBeenCalledWith(player.id);
  //   });
});
