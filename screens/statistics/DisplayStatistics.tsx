import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useSqlite from "../../hooks/useSqlite";
import usePlayerStats from "../../hooks/usePlayerStats";

import { Text, View } from "@components/Themed";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsBody from "./StatisticsBody";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type DisplayStatisticsProps = NativeStackScreenProps<
  RootStackParamList,
  "display-statistics"
>;

let stats: any[] = [];
const DisplayStatistics = ({ route }: DisplayStatisticsProps) => {
  const { variant } = route.params;
  const { playerList } = usePlayerState();
  const {
    overallStats,
    baseballStats,
    cricketStats,
    eliminationStats,
    killerStats,
    x01Stats,
  } = usePlayerStats();
  const { calculateWinPercent } = useSqlite();

  const assignStatsArray = () => {
    switch (variant) {
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

  // useEffect(() => {
  //   playerList.forEach((player: IPlayer) => {
  //     if (player.id !== undefined)
  //       if (variant === "baseball") stats = baseballStats;
  //       else if (variant === "cricket") stats = cricketStats;
  //       else if (variant === "elimination") stats = eliminationStats;
  //       else if (variant === "killer") stats = killerStats;
  //       else if (variant === "x01") stats = x01Stats;
  //       else stats = overallStats;
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statsListHeader}>
        <StatisticsHeader variant={variant} />
      </View>
      {/* {stats.length < 1 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No games have been played</Text>
        </View>
      ) : ( */}
      <View style={styles.statsBodyContainer}>
        <StatisticsBody
          variant={variant}
          stats={assignStatsArray()}
          calculateWinPercent={calculateWinPercent}
        />
      </View>
      {/* )} */}
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
