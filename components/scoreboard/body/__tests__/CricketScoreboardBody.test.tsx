import React from "react";

import { screen, render } from "@testing-library/react-native";

import CricketScoreboardBody from "../CricketScoreboardBody";

const player = {
  id: 1,
  name: "Test User",
  scoreList: [],
  score: 0,
  lives: 0,
  selected: true,
};

describe("<CricketScoreboardBody />", () => {
  it("should render the scoreboard row", () => {
    render(<CricketScoreboardBody player={player} />);
    const playerName = screen.getByText("Test User");

    expect(playerName).toBeDefined();
  });
});
