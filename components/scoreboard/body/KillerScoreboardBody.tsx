import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

import { Ionicons } from "@expo/vector-icons";

interface IKillerScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
}

const KillerScoreboardBody = (props: IKillerScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  const colorScheme = useColorScheme();
  const activePlayerRow = Colors[colorScheme].activePlayer;

  return (
    <View
      style={[
        player.id === currentPlayer ? { backgroundColor: activePlayerRow } : {},
        styles.scoreboardRow,
      ]}
    >
      <View style={styles.playerColumn}>
        <View style={styles.playerNameColumn}>
          <Text style={styles.playerNameText}>{player.name}</Text>
        </View>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.scoreText}>{player.score}</Text>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.scoreText}>{player.lives}</Text>
      </View>
      <View style={styles.scoreColumn}>
        <Text style={styles.scoreText}>
          {player.killer === true ? (
            <Ionicons
              name="checkmark"
              size={24}
              color={Colors[colorScheme].text}
            />
          ) : (
            ""
          )}
        </Text>
      </View>
    </View>
  );
};

export default KillerScoreboardBody;

const styles = StyleSheet.create({
  scoreboardRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  playerColumn: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 2,
    backgroundColor: "transparent",
  },
  playerNameColumn: { flex: 1, backgroundColor: "transparent" },
  playerNameText: { textAlign: "left", fontSize: 20 },
  scoreColumn: { flex: 0.8, backgroundColor: "transparent" },
  scoreText: { textAlign: "center", fontSize: 20 },
});
