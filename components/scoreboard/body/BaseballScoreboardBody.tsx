import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

interface IBaseballScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
}

const BaseballScoreboardBody = (props: IBaseballScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  const colorScheme = useColorScheme();
  const activePlayerColor = Colors[colorScheme].activePlayer;

  return (
    <View
      style={[
        player.id === currentPlayer
          ? { backgroundColor: activePlayerColor }
          : {},
        {
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 2,
        },
      ]}
    >
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
  textCentered: { textAlign: "center" },
  textSize: { fontSize: 18 },
  transparentBg: { backgroundColor: "transparent" },
});
