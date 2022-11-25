import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

interface IEliminationScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
}

const EliminationScoreboardBody = (props: IEliminationScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  const colorScheme = useColorScheme();
  const activePlayerRow = Colors[colorScheme].activePlayer;

  return (
    <View
      style={[
        player.id === currentPlayer ? { backgroundColor: activePlayerRow } : {},
        styles.bodyRow,
      ]}
    >
      {player.lives === 0 ? <View style={styles.strikeThrough} /> : null}
      <View style={styles.playerColumn}>
        <View style={styles.playerNameColumn}>
          <Text style={styles.playerText} key={player.id}>
            {player.name}
          </Text>
        </View>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.scoreText}>{player.score}</Text>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.scoreText}>{player.lives}</Text>
      </View>
    </View>
  );
};

export default EliminationScoreboardBody;

const styles = StyleSheet.create({
  bodyRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    position: "relative",
  },
  strikeThrough: {
    borderBottomWidth: 0.75,
    borderBottomColor: "black",
    width: "105%",
    position: "absolute",
    top: "50%",
  },
  playerColumn: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 2,
    backgroundColor: "transparent",
  },
  playerNameColumn: {
    flex: 0.8,
    backgroundColor: "transparent",
  },
  scoreColumn: { flex: 1, backgroundColor: "transparent" },
  playerText: { textAlign: "left", fontSize: 20 },
  scoreText: { textAlign: "center", fontSize: 20 },
});
