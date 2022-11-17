import React from "react";
import { StyleSheet } from "react-native";

import useSqlite from "../../hooks/useSqlite";
import usePlayerStats, {
  GameStats,
  OverallStats,
  X01Stats,
} from "../../hooks/usePlayerStats";

import { View } from "@components/Themed";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsBody from "./StatisticsBody";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GameVariants, RootStackParamList } from "types";

type DisplayStatisticsProps = NativeStackScreenProps<
  RootStackParamList,
  "display-statistics"
>;

const DisplayStatistics = ({ route }: DisplayStatisticsProps) => {
  const { variant } = route.params;

  const {
    overallStats,
    baseballStats,
    cricketStats,
    eliminationStats,
    killerStats,
    x01Stats,
  } = usePlayerStats();
  const { calculateWinPercent } = useSqlite();

  const assignStatsArray = (
    game: GameVariants
  ): (OverallStats | GameStats | X01Stats)[] => {
    switch (game) {
      case "baseball":
        return baseballStats;
      case "cricket":
        return cricketStats;
      case "elimination":
        return eliminationStats;
      case "killer":
        return killerStats;
      case "x01":
        return x01Stats;
      default:
        return overallStats;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsListHeader}>
        <StatisticsHeader variant={variant} />
      </View>
      <View style={styles.statsBodyContainer}>
        <StatisticsBody
          variant={variant}
          stats={assignStatsArray(variant)}
          calculateWinPercent={calculateWinPercent}
        />
      </View>
    </View>
  );
};

export default DisplayStatistics;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5 },
  statsListHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  emptyListContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: { fontSize: 20 },
  statsBodyContainer: { paddingTop: 5 },
});
