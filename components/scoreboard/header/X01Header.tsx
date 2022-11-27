import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "../../Themed";

import { x01Header } from "./constants";

const X01Header = () => {
  return (
    <View style={styles.scoreboardRow}>
      {x01Header.map((text) => {
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

export default X01Header;

const styles = StyleSheet.create({
  scoreboardRow: { flexDirection: "row", justifyContent: "center" },
  playerHeaderColumn: {
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  pointsHeaderColumn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  scoreboardText: { textAlign: "center", fontSize: 20 },
});
