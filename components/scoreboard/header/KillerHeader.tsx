import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { killerHeader } from "./constants";

const KillerHeader = () => {
  return (
    <View style={styles.headerRow}>
      {killerHeader.map((item) => {
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

export default KillerHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 3,
  },
  playerColumn: {
    flex: 1,
    borderRightColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  scoreColumn: {
    flex: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: { textAlign: "center", fontSize: 20 },
});
