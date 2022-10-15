import React from "react";

import { StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { IPlayer } from "@context/PlayerContext";
import { View } from "../../Themed";

const CricketScoreboardColumn = ({
  player,
  colorScheme,
}: // hitTargets,
{
  player: IPlayer;
  colorScheme: string;
  // hitTargets: Array<number>;
}) => {
  const hitTargets = [
    player.scoreList.filter((hitNum) => hitNum === 20).length,
    player.scoreList.filter((hitNum) => hitNum === 19).length,
    player.scoreList.filter((hitNum) => hitNum === 18).length,
    player.scoreList.filter((hitNum) => hitNum === 17).length,
    player.scoreList.filter((hitNum) => hitNum === 16).length,
    player.scoreList.filter((hitNum) => hitNum === 15).length,
    player.scoreList.filter((hitNum) => hitNum === 25).length,
  ];

  const renderIcon = (target: number) => {
    if (target === 1) {
      return (
        <MaterialCommunityIcons
          testID="one-point"
          accessible={true}
          accessibilityLabel="One Point"
          name="slash-forward"
          size={24}
          color={colorScheme}
          style={{ marginHorizontal: 6, transform: [{ rotate: "15deg" }] }}
        />
      );
    } else if (target === 2) {
      return (
        <Feather
          testID="two-points"
          accessible={true}
          accessibilityLabel="Two Points"
          name="x"
          size={24}
          color={colorScheme}
          style={{ marginHorizontal: 6 }}
        />
      );
    } else if (target >= 3) {
      return (
        <AntDesign
          testID="3-points"
          accessibilityLabel="3 Points"
          name="closecircleo"
          size={24}
          color={colorScheme}
          style={{ marginHorizontal: 6 }}
        />
      );
    } else return null;
  };

  return (
    <>
      {hitTargets.map((target, index) => {
        return (
          <View
            key={index}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {renderIcon(target)}
          </View>
        );
      })}
    </>
  );
};

export default CricketScoreboardColumn;

const styles = StyleSheet.create({});
