import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../Themed";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

import { IPlayer } from "@context/PlayerContext";
interface IX01ScoreboardBodyProps {
  selectedPlayers: IPlayer[];
  currentPlayer: IPlayer;
}

const X01ScoreboardBody = (props: IX01ScoreboardBodyProps) => {
  const { selectedPlayers, currentPlayer } = props;
  const colorScheme = useColorScheme();
  const activePlayerRow = Colors[colorScheme].activePlayer;

  return (
    <>
      {selectedPlayers.map((player) => {
        return (
          <View
            key={player.id}
            style={[
              player.id === currentPlayer.id
                ? { backgroundColor: activePlayerRow }
                : {},
              styles.playerRow,
            ]}
          >
            <View
              style={[
                styles.playerColumn,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                },
              ]}
            >
              <View style={{ flex: 4, backgroundColor: "transparent" }}>
                <Text style={[styles.scoreboardText]}>{player.name}</Text>
              </View>
            </View>
            <Text style={[styles.scoreboardText, { flex: 1 }]}>0</Text>
            <Text style={[styles.scoreboardText, { flex: 1 }]}>
              {player.score}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default X01ScoreboardBody;

const styles = StyleSheet.create({
  scoreboardText: { textAlign: "center", fontSize: 20 },
  playerRow: { flexDirection: "row" },
  playerColumn: {
    flex: 3,
  },
});
