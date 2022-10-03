import React from "react";

import { StyleSheet } from "react-native";
import { Text, View } from "@components/Themed";
import { baseballHeader } from "./constants";

const BaseballHeader = () => {
  return (
    <View style={styles.scoreboardHeader}>
      {baseballHeader.map((text) => {
        return (
          <View
            key={text}
            style={[
              text === "Player" || text === "Total" ? { flex: 2 } : { flex: 1 },
              { borderBottomColor: "gray", borderBottomWidth: 1 },
            ]}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default BaseballHeader;

const styles = StyleSheet.create({
  scoreboardHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 3,
  },
});
