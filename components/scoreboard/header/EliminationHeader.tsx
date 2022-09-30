import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

import { eliminationHeader } from "./constants";

const EliminationHeader = () => {
  return (
    <View style={styles.headerRow}>
      {eliminationHeader.map((item) => {
        return (
          <View
            key={item}
            style={item === "Player" ? styles.playerColumn : styles.scoreColumn}
          >
            <Text style={styles.headerText}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default EliminationHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  playerColumn: {
    flex: 1,
    borderRightColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  scoreColumn: { flex: 1, borderBottomWidth: 1, borderBottomColor: "gray" },
  headerText: { textAlign: "center", fontSize: 20 },
});
