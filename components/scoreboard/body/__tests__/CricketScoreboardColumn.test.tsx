import React from "react";

import { screen, render, cleanup } from "@testing-library/react-native";

import CricketScoreboardColumn from "../CricketScoreboardColumn";

const playerNoScore = {
  id: 1,
  name: "Test User",
  scoreList: [],
  score: 0,
  lives: 0,
  selected: true,
};

const playerWithScore = {
  id: 1,
  name: "Test User",
  scoreList: [20, 19, 19, 18, 18, 18],
  score: 0,
  lives: 0,
  selected: true,
};

describe("<CricketScoreboardColumn />", () => {
  //   afterEach(() => cleanup());

  it("should render the column with no values", () => {
    render(<CricketScoreboardColumn player={playerNoScore} />);

    const onePoint = screen.queryByTestId("one-point");
    const twoPoint = screen.queryByTestId("two-points");
    const threePoint = screen.queryByTestId("three-points");

    expect(onePoint).toBe(null);
    expect(twoPoint).toBe(null);
    expect(threePoint).toBe(null);
  });

  it("should render the row displaying all three icons", () => {
    render(<CricketScoreboardColumn player={playerWithScore} />);

    const onePoint = screen.findByTestId("one-point");
    const twoPoint = screen.findByTestId("two-points");
    const threePoint = screen.findByTestId("three-points");

    expect(onePoint).toBeTruthy();
    expect(twoPoint).toBeTruthy();
    expect(threePoint).toBeTruthy();
  });
});
