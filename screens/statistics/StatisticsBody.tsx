import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

import { StatisticsHeaderProps } from "./StatisticsHeader";
import { PlayerStats, BaseballStats, X01Stats } from "../../screens/Statistics";
interface StatisticsBodyProps extends StatisticsHeaderProps {
  stats: X01Stats[];
  calculateWinPercent: (gamesWon: number, gamesPlayed: number) => number;
}

const StatisticsBody = (props: StatisticsBodyProps) => {
  const { stats, variant, calculateWinPercent } = props;

  return (
    <>
      {stats.map((player) => {
        return (
          <View
            key={player.id}
            style={{ flexDirection: "row", paddingVertical: 3 }}
          >
            <Text style={{ flex: 1, textAlign: "center" }}>{player.name}</Text>
            <Text style={{ flex: 1, textAlign: "center" }}>
              {player.games_played}
            </Text>
            <Text style={{ flex: 1, textAlign: "center" }}>
              {player.games_won}
            </Text>
            <Text style={{ flex: 1, textAlign: "center" }}>
              {player.games_lost}
            </Text>
            <Text style={{ flex: 1, textAlign: "center" }}>
              {calculateWinPercent(
                player.games_won,
                player.games_played
              ).toFixed(2)}
              %
            </Text>
            {variant !== "overall" ? (
              <Text style={{ flex: 1, textAlign: "center" }}>
                {player.highscore}
              </Text>
            ) : null}
            {variant === "x01" ? (
              <Text style={{ flex: 1, textAlign: "center" }}>
                {player.one_dart_average}
              </Text>
            ) : null}
          </View>
        );
      })}
    </>
  );
};

export default StatisticsBody;

const styles = StyleSheet.create({});
