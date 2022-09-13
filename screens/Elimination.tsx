import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import { Text, View } from "../components/Themed";

import { IPlayer, usePlayerState } from "../context/PlayerContext";
import { regularButtons } from "@scoreboard/calculator-buttons/constants";

const eliminationHeader = ["Player", "Score", "Lives"];

const Elimination = () => {
  const { playerList } = usePlayerState();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {eliminationHeader.map((item) => {
          return <Text key={item}>{item}</Text>;
        })}
      </View>
      <View style={{}}>
        {playerList.map((player: IPlayer) => {
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text key={player.id}>{player.name}</Text>
                <AntDesign name="caretleft" size={18} color="darkred" />
              </View>
              <Text>{player.score}</Text>
              <Text>{player.lives}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <CalculatorButtons data={regularButtons} />
      </View>
    </View>
  );
};

export default Elimination;

const styles = StyleSheet.create({});
