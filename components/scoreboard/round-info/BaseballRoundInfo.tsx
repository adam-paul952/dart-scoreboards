import React from "react";

import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface IBaseballRoundInfoProps {
  round: number;
  currentPlayer: IPlayer;
  playerScore: string;
  leadingScore: number;
}

const BaseballRoundInfo = (props: IBaseballRoundInfoProps) => {
  const { round, currentPlayer, playerScore, leadingScore } = props;

  const scoreDifference = currentPlayer.score - leadingScore;

  return (
    <>
      <View style={styles.throwIndicatorContainer}>
        <View style={styles.paddingHorizontal}>
          <Text style={styles.throwIndicatorText}>
            {currentPlayer.name} to throw
          </Text>
        </View>
      </View>
      <View style={styles.roundInfoContainer}>
        <View style={[styles.paddingHorizontal, { width: "33%" }]}>
          <TextInput
            style={[
              Math.sign(scoreDifference)
                ? { backgroundColor: "rgba(255,0,0,0.2)" }
                : { backgroundColor: "rgba(75,181,67, 0.4)" },
              styles.scoreInput,
            ]}
            editable={false}
            showSoftInputOnFocus={false}
            textAlign="center"
            value={`${scoreDifference} pts`}
          />
        </View>
        <View style={[styles.paddingHorizontal, { width: "33%" }]}>
          <Text style={{ fontSize: 20, padding: 5 }}>Points</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value={playerScore === "" ? "0" : playerScore}
            textAlign="center"
          />
        </View>
      </View>
      <View style={styles.roundStatsContainer}>
        <Text style={styles.roundStatsText}>Inning: {round}</Text>
        <Text style={styles.roundStatsText}>
          Highscore: {currentPlayer.stats.highScore}
        </Text>
      </View>
    </>
  );
};

export default BaseballRoundInfo;

const styles = StyleSheet.create({
  throwIndicatorContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
  },
  throwIndicatorText: {
    fontSize: 20,
    padding: 5,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  roundInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
  roundStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    marginTop: 5,
  },
  roundStatsText: { fontSize: 15 },
  paddingHorizontal: { paddingHorizontal: 5 },
});
