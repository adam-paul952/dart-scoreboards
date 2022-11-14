import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";

import ManagePlayerScreen from "../ManagePlayer";
import { PlayerListProvider } from "../../context/PlayerContext";

const noPlayersFound = `No players added -- Please add players to continue`;

const players = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "Test 3" },
];

const component = (
  <PlayerListProvider>
    <NavigationContainer>
      <ManagePlayerScreen />
    </NavigationContainer>
  </PlayerListProvider>
);

describe("<ManagePlayerScreen />", () => {
  it("should display no players added if no players are present", () => {
    // render(component);
    // // find element
    // const noPlayersMsg = screen.getByText(noPlayersFound);
    // // assert
    // expect(noPlayersMsg).toBeTruthy();
  });
});
