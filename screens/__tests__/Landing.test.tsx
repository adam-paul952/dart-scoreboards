import React from "react";

import { fireEvent, render, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import Landing from "../Landing";

const component = (
  <NavigationContainer>
    <Landing />
  </NavigationContainer>
);

describe("<Landing />", () => {
  it("should display the landing page", () => {
    render(component);

    const landingButtons = screen.getAllByRole("button");
    const newGame = screen.getByText("New Game");
    const resumeGame = screen.getByText("Resume Game");
    const managePlayers = screen.getByText("Manage Players");
    const stats = screen.getByText("Stats");

    expect(landingButtons).toHaveLength(4);
    expect(newGame).toBeTruthy();
    expect(resumeGame).toBeTruthy();
    expect(managePlayers).toBeTruthy();
    expect(stats).toBeTruthy();
  });

  it("should navigate to manage players screen on user press", () => {
    render(component);

    const managePlayers = screen.getByText("Manage Players");
    fireEvent(managePlayers, "press");

    const header = screen.getByText("Manage Players");
    expect(header).toBeTruthy();
  });
});
