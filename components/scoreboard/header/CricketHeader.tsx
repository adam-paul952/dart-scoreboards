import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { cricketHeader } from "./constants";

const CricketHeader = () => {
  return (
    <View style={styles.scoreboardRow}>
      {cricketHeader.map((text) => {
        return (
          <View
            key={text}
            style={
              text === "Player"
                ? styles.playerHeaderColumn
                : styles.pointsHeaderColumn
            }
          >
            <Text style={styles.scoreboardText}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CricketHeader;

const styles = StyleSheet.create({
  scoreboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  playerHeaderColumn: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  pointsHeaderColumn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  scoreboardText: { textAlign: "center", fontSize: 18 },
});
