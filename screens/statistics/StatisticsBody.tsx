import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

import { StatisticsHeaderProps } from "./StatisticsHeader";
interface StatisticsBodyProps extends StatisticsHeaderProps {
  stats: any;
  calculateWinPercent: (gamesWon: number, gamesPlayed: number) => number;
}

const StatisticsBody = (props: StatisticsBodyProps) => {
  const { stats, variant, calculateWinPercent } = props;

  return (
    <>
      {stats.map((player: any) => {
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
              {calculateWinPercent(player.games_won, player.games_played)} %
            </Text>
            {variant === "baseball" ? (
              <Text style={{ flex: 1, textAlign: "center" }}>
                {player.highscore}
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
