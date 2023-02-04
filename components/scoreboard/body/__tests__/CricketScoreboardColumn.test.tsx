import React from "react";

import TestRenderer from "react-test-renderer";
import { render, screen, within } from "@testing-library/react-native";

import CricketScoreboardColumn from "../CricketScoreboardColumn";

const player = {
  id: 1,
  name: "Test 1",
  score: 0,
  selected: true,
  scoreList: [] as Array<number>,
  lives: 0,
  killer: false,
  stats: { highScore: 0, oneDartAverage: 0, darts: 0 },
};

let color = "black";

describe("<CricketScoreboardColumn />", () => {
  it("should display the cricket scoreboard with one point marked", async () => {
    let testPlayer = { ...player };
    testPlayer.scoreList = [20];

    render(
      <CricketScoreboardColumn player={testPlayer} hitMarkColor={color} />
    );

    const icon = await screen.findByLabelText(/one\s?point/i);
    expect(icon).toBeDefined();
  });

  it("should display the cricket scoreboard with two points marked", async () => {
    let testPlayer = { ...player };
    testPlayer.scoreList = [20, 20];

    render(
      <CricketScoreboardColumn player={testPlayer} hitMarkColor={color} />
    );

    const icon = await screen.findByLabelText(/two\s?points/i);
    expect(icon).toBeDefined();
  });

  it("should display the cricket scoreboard with three points marked", async () => {
    let testPlayer = { ...player };
    testPlayer.scoreList = [20, 20, 20];

    render(
      <CricketScoreboardColumn player={testPlayer} hitMarkColor={color} />
    );

    const icon = await screen.findByLabelText(/three\s?points/i);
    expect(icon).toBeDefined();
  });

  it("should display the current player with current marks", async () => {
    const renderer = TestRenderer.create(
      <CricketScoreboardColumn
        player={player}
        hitMarkColor={color}
        hitTargets={[3, 1, 1, 0, 0, 0, 0]}
      />
    );

    const view = within(renderer.root);

    expect(view.getAllByLabelText(/one\s?point/i)).toHaveLength(2);
    expect(view.getByLabelText(/three\s?points/i)).toBeDefined();
  });
});
