import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface IEliminationScoreboardBodyProps {
  player: IPlayer;
}

const EliminationScoreboardBody = (props: IEliminationScoreboardBodyProps) => {
  const { player } = props;
  return (
    <View style={styles.bodyRow}>
      <View style={styles.playerColumn}>
        <View style={styles.turnIndicatorColumn}>
          <AntDesign
            style={styles.turnIndicator}
            name="caretright"
            size={20}
            color="darkred"
          />
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
  bodyRow: { flexDirection: "row", justifyContent: "space-evenly" },
  playerColumn: {
    flexDirection: "row",
    flex: 1,
    borderRightColor: "gray",
    borderRightWidth: 1,
    marginLeft: 2,
  },
  turnIndicatorColumn: { flex: 0.2, paddingRight: 25 },
  turnIndicator: { textAlign: "right", marginTop: 4 },
  playerNameColumn: {
    flex: 0.8,
  },
  scoreColumn: { flex: 1 },
  playerText: { textAlign: "left", fontSize: 20 },
  scoreText: { textAlign: "center", fontSize: 20 },
});
