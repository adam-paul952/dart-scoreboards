import React from "react";

import { cleanup, render } from "@testing-library/react-native";

import GameScoreboardHeader from "../GameScoreboardHeader";
import {
  baseballHeader,
  cricketHeader,
  eliminationHeader,
  killerHeader,
  x01Header,
} from "../constants";

describe("<BaseballHeader />", () => {
  beforeEach(cleanup);

  it("should render the scoreboard header for baseball", () => {
    const { getByText } = render(<GameScoreboardHeader variant="baseball" />);

    baseballHeader.forEach((column, index) => {
      expect(getByText(column).props.children).toMatch(baseballHeader[index]);
    });
  });

  it("should render the scoreboard header for cricket", () => {
    const { getByText } = render(<GameScoreboardHeader variant="cricket" />);

    cricketHeader.forEach((column, index) => {
      expect(getByText(column).props.children).toMatch(cricketHeader[index]);
    });
  });

  it("should render the scoreboard header for elimination", () => {
    const { getByText } = render(
      <GameScoreboardHeader variant="elimination" />
    );

    eliminationHeader.forEach((column, index) => {
      expect(getByText(column).props.children).toMatch(
        eliminationHeader[index]
      );
    });
  });

  it("should render the scoreboard header for killer", () => {
    const { getByText } = render(<GameScoreboardHeader variant="killer" />);

    killerHeader.forEach((column, index) => {
      expect(getByText(column).props.children).toMatch(killerHeader[index]);
    });
  });

  it("should render the scoreboard header for x01", () => {
    const { getByText } = render(<GameScoreboardHeader variant="x01" />);

    x01Header.forEach((column, index) => {
      expect(getByText(column).props.children).toMatch(x01Header[index]);
    });
  });
});
