import React from "react";

import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface IEliminationRoundInfo {
  currentPlayer: IPlayer;
  round: number;
  playerScore: string;
}

const EliminationRoundInfo = (props: IEliminationRoundInfo) => {
  const { currentPlayer, round, playerScore } = props;

  return (
    <>
      {/* current round info container */}
      <View style={styles.currentRoundInfoContainer}>
        <View style={styles.currentRoundInfoRow}>
          <Text style={[styles.currentRoundText, { fontWeight: "600" }]}>
            {currentPlayer.name} to throw
          </Text>
        </View>
        {/* player points container */}
        <View style={styles.pointsContainer}>
          <Text style={[styles.currentRoundText, { textAlign: "center" }]}>
            Points
          </Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value={playerScore}
            textAlign="center"
          />
        </View>
        {/* end player points container */}
      </View>
      {/* end current round info container */}
      {/* player round info container */}
      <View style={styles.playerRoundInfo}>
        <Text style={styles.playerRoundText}>Round: {round}</Text>
        <Text style={styles.playerRoundText}>
          High Score: {currentPlayer.stats.highScore}
        </Text>
      </View>
      {/* end player round info container */}
    </>
  );
};

export default EliminationRoundInfo;

const styles = StyleSheet.create({
  currentRoundInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  currentRoundInfoRow: {
    width: "45%",
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  currentRoundText: { fontSize: 20 },
  pointsContainer: { width: "33%" },
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
  playerRoundInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
  playerRoundText: { fontSize: 15 },
});
