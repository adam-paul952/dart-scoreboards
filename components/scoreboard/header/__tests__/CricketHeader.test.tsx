import React from "react";

import { screen, render } from "@testing-library/react-native";

import CricketHeader from "../CricketHeader";

describe("<CricketHeader />", () => {
  it("should render the header for the cricket scoreboard", () => {
    render(<CricketHeader />);
    const column1 = screen.getByText("Player");
    const column2 = screen.getByText("20");
    const column3 = screen.getByText("19");
    const column4 = screen.getByText("18");
    const column5 = screen.getByText("17");
    const column6 = screen.getByText("16");
    const column7 = screen.getByText("15");
    const column8 = screen.getByText("Bull");
    const column9 = screen.getByText("Pts");

    expect(column1).toBeDefined();
    expect(column2).toBeDefined();
    expect(column3).toBeDefined();
    expect(column4).toBeDefined();
    expect(column5).toBeDefined();
    expect(column6).toBeDefined();
    expect(column7).toBeDefined();
    expect(column8).toBeDefined();
    expect(column9).toBeDefined();
  });
});
