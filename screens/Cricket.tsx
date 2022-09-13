import React from "react";

import { StyleSheet } from "react-native";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

import { View } from "../components/Themed";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import CricketRoundInfo from "@scoreboard/round-info/CricketRoundInfo";
import CricketHeader from "@scoreboard/header/CricketHeader";
import CricketScoreboardBody from "@scoreboard/body/CricketScoreboardBody";
import { cricketButtons } from "@scoreboard/calculator-buttons/constants";

const Cricket = () => {
  const { playerList } = usePlayerState();

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <CricketHeader />
        <View>
          {playerList.map((player: IPlayer) => {
            return <CricketScoreboardBody key={player.id} player={player} />;
          })}
        </View>
      </View>
      <View>
        <CricketRoundInfo />
        <CalculatorButtons data={cricketButtons} />
      </View>
    </View>
  );
};

export default Cricket;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
});
