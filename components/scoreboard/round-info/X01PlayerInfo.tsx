import { IPlayer } from "@context/PlayerContext";
import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "../../Themed";

interface IX01PlayerInfo {
  currentPlayer: IPlayer;
}

const X01PlayerInfo = (props: IX01PlayerInfo) => {
  const { currentPlayer } = props;

  return (
    <View style={styles.rowStyle}>
      <Text style={styles.textStyle}>Darts: {currentPlayer.stats.darts}</Text>
      <Text style={styles.textStyle}>
        1-Dart: {currentPlayer.stats.oneDartAverage}%
      </Text>
      <Text style={styles.textStyle}>
        High Score: {currentPlayer.stats.highScore}
      </Text>
      {/* <Text style={styles.textStyle}>
        CO:
        {currentPlayer.stats.checkoutPercent === 0
          ? " --"
          : `${currentPlayer.stats.checkoutPercent}%`}
      </Text> */}
    </View>
  );
};

export default X01PlayerInfo;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
  textStyle: { fontSize: 15 },
});
