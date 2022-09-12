import React from "react";

import { StyleSheet } from "react-native";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

import { View } from "../components/Themed";
import CricketCalculatorButtons from "../components/scoreboard/calculator-buttons/CricketCalculatorButtons";
import CricketRoundInfo from "../components/scoreboard/round-info/CricketRoundInfo";
import CricketHeader from "../components/scoreboard/header/CricketHeader";
import CricketScoreboardBody from "../components/scoreboard/body/CricketScoreboardBody";

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
        <CricketCalculatorButtons />
      </View>
    </View>
  );
};

export default Cricket;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
});
