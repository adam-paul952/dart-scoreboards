import React from "react";

import { cleanup, render } from "@testing-library/react-native";

import GameScoreboardBody from "../GameScoreboardBody";

const selectedPlayers = [
  {
    id: 1,
    name: "Test 1",
    score: 0,
    selected: true,
    scoreList: [],
    lives: 0,
    killer: false,
    stats: { highScore: 0, oneDartAverage: 0, darts: 0 },
  },
  {
    id: 2,
    name: "Test 2",
    score: 0,
    selected: true,
    scoreList: [],
    lives: 0,
    killer: false,
    stats: { highScore: 0, oneDartAverage: 0, darts: 0 },
  },
];

const gameVariants = ["baseball", "cricket", "elimination", "killer", "x01"];

describe("<GameScoreboardBody />", () => {
  beforeEach(cleanup);

  it.each(gameVariants)("should render the scoreboard body for %s", () => {
    const { getByText } = render(
      <GameScoreboardBody
        variant="baseball"
        selectedPlayers={selectedPlayers}
        currentPlayer={1}
      />
    );

    const playerOne = getByText(/test 1/i);
    const playerTwo = getByText(/test 2/i);

    expect(playerOne.props.children).toMatch(selectedPlayers[0].name);
    expect(playerTwo.props.children).toMatch(selectedPlayers[1].name);
  });
});
