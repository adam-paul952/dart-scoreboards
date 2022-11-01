import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useSqlite from "../../hooks/useSqlite";

import { View } from "@components/Themed";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsBody from "./StatisticsBody";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

import { X01Stats } from "../../screens/Statistics";
type DisplayStatisticsProps = NativeStackScreenProps<
  RootStackParamList,
  "display-statistics"
>;

const DisplayStatistics = ({ route }: DisplayStatisticsProps) => {
  const { variant } = route.params;
  const { playerList, overallStats, baseballStats, cricketStats } =
    usePlayerState();
  const { onGetPlayerStats, calculateWinPercent } = useSqlite();

  const [stats, setStats] = useState<X01Stats[]>([]);

  useEffect(() => {
    playerList.forEach((player: IPlayer) => {
      if (player.id !== undefined)
        if (variant === "baseball") setStats(baseballStats);
        else if (variant === "cricket") setStats(cricketStats);
        else if (variant === "elimination") onGetPlayerStats(setStats, variant);
        else if (variant === "killer") onGetPlayerStats(setStats, variant);
        else if (variant === "x01") onGetPlayerStats(setStats, variant);
        else setStats(overallStats);
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
