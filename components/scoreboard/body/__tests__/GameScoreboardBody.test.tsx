import React from "react";

import { render, screen, waitFor } from "@testing-library/react-native";

import GameScoreboardBody from "../GameScoreboardBody";
import { PlayableGameVariants } from "hooks/useGame";

const selectedPlayers = [
  {
    id: 1,
    name: "Test 1",
    score: 0,
    selected: true,
    scoreList: [] as Array<number>,
    lives: 0,
    killer: false,
    stats: { highScore: 0, oneDartAverage: 0, darts: 0 },
  },
  {
    id: 2,
    name: "Test 2",
    score: 0,
    selected: true,
    scoreList: [] as Array<number>,
    lives: 0,
    killer: false,
    stats: { highScore: 0, oneDartAverage: 0, darts: 0 },
  },
];

const gameVariants: Array<PlayableGameVariants> = [
  "baseball",
  "cricket",
  "elimination",
  "killer",
  "x01",
];

describe("<GameScoreboardBody />", () => {
  // beforeEach(cleanup);

  it.each(gameVariants)(
    "should render the scoreboard body for %s",
    (variant) => {
      render(
        <GameScoreboardBody
          variant={variant}
          selectedPlayers={selectedPlayers}
          currentPlayer={1}
        />
      );

      const playerOne = screen.getByText(/test 1/i);
      const playerTwo = screen.getByText(/test 2/i);

      expect(playerOne.props.children).toMatch(selectedPlayers[0].name);
      expect(playerTwo.props.children).toMatch(selectedPlayers[1].name);
    }
  );

  describe("baseball", () => {
    // beforeEach(() =>
    //   selectedPlayers.map((player) => {
    //     if (player.scoreList.length > 0) player.scoreList = [];
    //     return player;
    //   })
    // );

    it("should show player score in the scoreboard", () => {
      let updatedPlayers = selectedPlayers.map((player) => {
        if (player.id === 1) {
          player.scoreList = [1, 2];
        }
        return player;
      });

      render(
        <GameScoreboardBody
          variant="baseball"
          selectedPlayers={updatedPlayers}
          currentPlayer={1}
        />
      );

      const scoreOne = screen.getByText(/^1/i);
      const scoreTwo = screen.getByText(/^2/i);

      expect(scoreOne).toBeDefined();
      expect(scoreTwo).toBeDefined();
    });

    it("should strikethrough player if in extra innings", async () => {
      render(
        <GameScoreboardBody
          variant="baseball"
          selectedPlayers={selectedPlayers}
          currentPlayer={1}
          playersOut={[selectedPlayers[0]]}
        />
      );

      const strikeThrough = await screen.findByLabelText(
        /eliminated\s?player/i
      );

      expect(strikeThrough).toBeDefined();
    });
  });

  describe("elimination", () => {
    it("should display a strikethrough if player has been eliminated", async () => {
      let updatedPlayers = selectedPlayers.map((player) => {
        if (player.id !== 1) {
          player.lives = 1;
        }
        return player;
      });

      render(
        <GameScoreboardBody
          variant="elimination"
          selectedPlayers={updatedPlayers}
          currentPlayer={1}
        />
      );

      const strikeThrough = await screen.findByLabelText(
        /eliminated\s?player/i
      );

      expect(strikeThrough).toBeDefined();
    });
  });

  describe("killer", () => {
    it("should display icon if player is killer", async () => {
      let updatedKiller = selectedPlayers.map((player) => {
        if (player.id === 1) player.killer = true;
        return player;
      });
      render(
        <GameScoreboardBody
          variant="killer"
          selectedPlayers={updatedKiller}
          currentPlayer={1}
        />
      );

      const killerActive = await screen.findByLabelText(/player\s?1\s?killer/i);

      expect(killerActive).toBeDefined();
    });
  });
});
