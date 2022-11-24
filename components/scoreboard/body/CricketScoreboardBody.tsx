import React from "react";
import { StyleSheet } from "react-native";

import CricketScoreboardColumn from "./CricketScoreboardColumn";
import { Text, View } from "../../Themed";

import { IPlayer } from "@context/PlayerContext";

import useColorScheme from "../../../hooks/useColorScheme";
import Colors from "../../../constants/Colors";

interface CricketScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: IPlayer;
}

const CricketScoreboardBody = (props: CricketScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  const colorScheme = useColorScheme();
  const hitMarkColor = Colors[colorScheme].text;
  const activePlayerColor = Colors[colorScheme].activePlayer;

  return (
    <View
      style={[
        player.id === currentPlayer.id
          ? { backgroundColor: activePlayerColor }
          : {},
        styles.playerRow,
      ]}
    >
      <View style={styles.playerColumn}>
        <Text style={[styles.scoreboardText, { flex: 3 }]}>{player.name}</Text>
      </View>
      <CricketScoreboardColumn player={player} hitMarkColor={hitMarkColor} />
      <Text style={[styles.scoreboardText, { flex: 1, textAlign: "center" }]}>
        {player.score}
      </Text>
    </View>
  );
};

export default CricketScoreboardBody;

const styles = StyleSheet.create({
  scoreboardText: { paddingLeft: 2, fontSize: 18 },
  playerRow: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  playerColumn: {
    flex: 2,
    backgroundColor: "transparent",
  },
});
