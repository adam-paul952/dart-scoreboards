import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

interface IBaseballScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
  playersOut: boolean;
}

const BaseballScoreboardBody = (props: IBaseballScoreboardBodyProps) => {
  const { player, currentPlayer, playersOut } = props;

  const colorScheme = useColorScheme();
  const activePlayerColor = Colors[colorScheme].activePlayer;

  return (
    <View
      style={[
        player.id === currentPlayer
          ? { backgroundColor: activePlayerColor }
          : {},
        styles.playerRow,
      ]}
    >
      {playersOut ? <View style={styles.strikeThrough} /> : null}
      <View style={[styles.transparentBg, { flex: 3 }]}>
        <Text style={[styles.textSize, { paddingLeft: 3 }]}>{player.name}</Text>
      </View>
      {player.scoreList.map((score, index) => {
        return (
          <View
            key={player.id * 25 + index}
            style={[styles.transparentBg, { flex: 1 }]}
          >
            <Text style={[styles.textCentered, styles.textSize]}>{score}</Text>
          </View>
        );
      })}
      <View style={[styles.transparentBg, { flex: 1.5 }]}>
        <Text style={[styles.textCentered, styles.textSize]}>
          {player.score}
        </Text>
      </View>
    </View>
  );
};

export default BaseballScoreboardBody;

const styles = StyleSheet.create({
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 2,
    position: "relative",
  },
  strikeThrough: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "105%",
    position: "absolute",
    top: "55%",
    left: "-2%",
  },
  textCentered: { textAlign: "center" },
  textSize: { fontSize: 18 },
  transparentBg: { backgroundColor: "transparent" },
});
