import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../Themed";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { IPlayer } from "@context/PlayerContext";

interface CricketScoreboardColumnProps {
  player: IPlayer;
  hitMarkColor: string;
  hitTargets?: number[];
}

const CricketScoreboardColumn = (props: CricketScoreboardColumnProps) => {
  const { player, hitMarkColor, hitTargets } = props;

  const numTargets = [
    player.scoreList.filter((hitNum) => hitNum === 20).length,
    player.scoreList.filter((hitNum) => hitNum === 19).length,
    player.scoreList.filter((hitNum) => hitNum === 18).length,
    player.scoreList.filter((hitNum) => hitNum === 17).length,
    player.scoreList.filter((hitNum) => hitNum === 16).length,
    player.scoreList.filter((hitNum) => hitNum === 15).length,
    player.scoreList.filter((hitNum) => hitNum === 25).length,
  ];

  let activeArray: number[] = [];

  if (hitTargets !== undefined)
    for (let i = 0; i < numTargets.length; i++) {
      activeArray[i] = numTargets[i] += hitTargets[i];
    }

  const renderIcon = (target: number) => {
    if (target === 1) {
      return (
        <MaterialCommunityIcons
          accessible={true}
          accessibilityLabel="One Point"
          name="slash-forward"
          size={22}
          color={hitMarkColor}
          style={[styles.iconMargin, { transform: [{ rotate: "15deg" }] }]}
        />
      );
    } else if (target === 2) {
      return (
        <Feather
          accessible={true}
          accessibilityLabel="Two Points"
          name="x"
          size={22}
          color={hitMarkColor}
          style={styles.iconMargin}
        />
      );
    } else if (target >= 3) {
      return (
        <AntDesign
          accessibilityLabel="Three Points"
          name="closecircleo"
          size={22}
          color={hitMarkColor}
          style={styles.iconMargin}
        />
      );
    } else return null;
  };

  return (
    <>
      {hitTargets === undefined
        ? numTargets.map((target, index) => (
            <View key={index} style={styles.iconContainer}>
              {renderIcon(target)}
            </View>
          ))
        : activeArray.map((target, index) => (
            <View key={index} style={styles.iconContainer}>
              {renderIcon(target)}
            </View>
          ))}
    </>
  );
};

export default CricketScoreboardColumn;

const styles = StyleSheet.create({
  iconMargin: { marginHorizontal: 6 },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
