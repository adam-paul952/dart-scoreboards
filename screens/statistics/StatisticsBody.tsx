import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

import { StatisticsHeaderProps } from "./StatisticsHeader";

interface StatisticsBodyProps extends StatisticsHeaderProps {
  stats: any[];
  calculateWinPercent: (gamesWon: number, gamesPlayed: number) => number;
}

const StatisticsBody = (props: StatisticsBodyProps) => {
  const { stats, variant, calculateWinPercent } = props;

  return (
    <>
      {stats.map((player) => {
        return (
          <View key={player.id} style={styles.statsListRow}>
            <Text style={styles.statsListText}>{player.name}</Text>
            <Text style={styles.statsListText}>{player.games_played}</Text>
            <Text style={styles.statsListText}>{player.games_won}</Text>
            <Text style={styles.statsListText}>{player.games_lost}</Text>
            <Text style={styles.statsListText}>
              {calculateWinPercent(
                player.games_won,
                player.games_played
              ).toFixed(2)}
              %
            </Text>
            {variant !== "overall" ? (
              <Text style={styles.statsListText}>{player.highscore}</Text>
            ) : null}
            {variant === "x01" ? (
              <Text style={styles.statsListText}>
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

const styles = StyleSheet.create({
  statsListRow: { flexDirection: "row", paddingVertical: 3 },
  statsListText: { flex: 1, textAlign: "center" },
});
