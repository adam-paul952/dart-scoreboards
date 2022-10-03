import React from "react";

import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import { IPlayer } from "@context/PlayerContext";

interface IBaseballScoreboardBodyProps {
  player: IPlayer;
  currentPlayer: number;
}

const BaseballScoreboardBody = (props: IBaseballScoreboardBodyProps) => {
  const { player, currentPlayer } = props;

  return (
    <View
      style={[
        player.id === currentPlayer ? { backgroundColor: "lightgray" } : {},
        {
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 2,
        },
      ]}
    >
      <View style={{ flex: 2, backgroundColor: "transparent" }}>
        <Text style={{ fontSize: 20, paddingLeft: 3 }}>{player.name}</Text>
      </View>
      {player.scoreList.map((score, index) => {
        return (
          <View
            key={player.id * 25 + index}
            style={{ flex: 1, backgroundColor: "transparent" }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>{score}</Text>
          </View>
        );
      })}
      <View style={{ flex: 2, backgroundColor: "transparent" }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {player.score}
        </Text>
      </View>
    </View>
  );
};

export default BaseballScoreboardBody;

const styles = StyleSheet.create({});