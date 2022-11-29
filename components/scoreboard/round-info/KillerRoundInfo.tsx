import React from "react";
import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";

import { IPlayer } from "@context/PlayerContext";

interface KillerRoundInfoProps {
  currentPlayer: IPlayer;
  round: number;
}

const KillerRoundInfo = (props: KillerRoundInfoProps) => {
  const { currentPlayer, round } = props;

  return (
    <>
      <View style={styles.currentTurnContainer}>
        <View style={styles.currentTurnTextContainer}>
          <Text style={styles.currentTurnText}>
            {currentPlayer.name} to throw
          </Text>
        </View>
        <View style={{ width: "33%" }}>
          <Text style={[{ textAlign: "center" }]}>Points</Text>
          <TextInput
            style={styles.scoreInput}
            editable={false}
            showSoftInputOnFocus={false}
            value=""
            textAlign="center"
          />
        </View>
      </View>
      <View style={styles.currentRoundContainer}>
        <Text style={styles.currentRoundInfoText}>Round: {round}</Text>
        <Text style={styles.currentRoundInfoText}>Place</Text>
        <Text style={styles.currentRoundInfoText}>Holder</Text>
      </View>
    </>
  );
};

export default KillerRoundInfo;

const styles = StyleSheet.create({
  currentTurnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  currentTurnTextContainer: {
    width: "45%",
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  currentTurnText: {
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
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
  currentRoundContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
  },
  currentRoundInfoText: { fontSize: 15 },
});
