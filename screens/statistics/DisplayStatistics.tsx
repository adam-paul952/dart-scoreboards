import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useSqlite from "../../hooks/useSqlite";

import { View } from "@components/Themed";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsBody from "./StatisticsBody";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

import { PlayerStats, BaseballStats } from "../../screens/Statistics";
type DisplayStatisticsProps = NativeStackScreenProps<
  RootStackParamList,
  "display-statistics"
>;

const DisplayStatistics = ({ route }: DisplayStatisticsProps) => {
  const { variant } = route.params;
  const { playerList } = usePlayerState();
  const { onGetPlayerStats, onGetAllPlayerBaseballStats, calculateWinPercent } =
    useSqlite();

  const [stats, setStats] = useState<PlayerStats[] | BaseballStats[]>([]);

  useEffect(() => {
    playerList.forEach((player: IPlayer) => {
      if (player.id !== undefined)
        if (variant === "baseball") onGetAllPlayerBaseballStats(setStats);
        else if (variant === "overall") onGetPlayerStats(setStats);
    });
  }, []);

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "gray",
        }}
      >
        <StatisticsHeader variant={variant} />
      </View>
      <View style={{ paddingTop: 5 }}>
        <StatisticsBody
          variant={variant}
          stats={stats}
          calculateWinPercent={calculateWinPercent}
        />
      </View>
    </View>
  );
};

export default DisplayStatistics;

const styles = StyleSheet.create({});
