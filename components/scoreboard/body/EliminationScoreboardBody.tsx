import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface IEliminationScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
}

const EliminationScoreboardBody = (props: IEliminationScoreboardBodyProps) => {
  const { player, currentPlayer } = props;
  return (
    <View
      style={[
        player.lives === 0 ? { backgroundColor: "lightgray" } : {},
        styles.bodyRow,
      ]}
    >
      <View style={styles.playerColumn}>
        <View style={styles.turnIndicatorColumn}>
          {currentPlayer === player.id && (
            <AntDesign
              style={styles.turnIndicator}
              name="caretright"
              size={20}
              color="darkred"
            />
          )}
        </View>
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
  },
  playerColumn: {
    flexDirection: "row",
    flex: 1,
    borderRightColor: "gray",
    borderRightWidth: 1,
    marginLeft: 2,
    backgroundColor: "transparent",
  },
  turnIndicatorColumn: {
    flex: 0.2,
    paddingRight: 10,
    backgroundColor: "transparent",
  },
  turnIndicator: { textAlign: "right", marginTop: 4 },
  playerNameColumn: {
    flex: 0.8,
    backgroundColor: "transparent",
  },
  scoreColumn: { flex: 1, backgroundColor: "transparent" },
  playerText: { textAlign: "left", fontSize: 20 },
  scoreText: { textAlign: "center", fontSize: 20 },
});
