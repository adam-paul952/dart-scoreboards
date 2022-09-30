import React from "react";

import { StyleSheet } from "react-native";

import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import { Text, TextInput, View } from "../components/Themed";

import { IPlayer, usePlayerState } from "../context/PlayerContext";
import { regularButtons } from "@scoreboard/calculator-buttons/constants";

import EliminationHeader from "@components/scoreboard/header/EliminationHeader";
import EliminationScoreboardBody from "@components/scoreboard/body/EliminationScoreboardBody";

const Elimination = () => {
  const { playerList } = usePlayerState();
  return (
    <View style={{ flex: 1, flexDirection: "column", paddingTop: 20 }}>
      <EliminationHeader />
      <>
        {playerList.map((player: IPlayer) => {
          return (
            <EliminationScoreboardBody key={player.name} player={player} />
          );
        })}
      </>
      <>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "33%", paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>Adam</Text>
            <TextInput
              // style={styles.scoreInput}
              editable={false}
              showSoftInputOnFocus={false}
              textAlign="center"
              // value="+0 pts"
            />
          </View>
          <View style={{ width: "33%", paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>Marks</Text>
            <TextInput
              // style={styles.scoreInput}
              editable={false}
              showSoftInputOnFocus={false}
              // value="0"
              textAlign="center"
            />
          </View>
          <View style={{ width: "33%", paddingHorizontal: 5 }}>
            <Text style={{ fontSize: 20, paddingHorizontal: 5 }}>Points</Text>
            <TextInput
              // style={styles.scoreInput}
              editable={false}
              showSoftInputOnFocus={false}
              // value="0"
              textAlign="center"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontSize: 15 }}>Round: 0</Text>
          <Text>mks/r: --</Text>
          <Text>pts/r: --</Text>
          <Text>mks: --/21</Text>
        </View>
      </>
      <View>
        <CalculatorButtons data={regularButtons} />
      </View>
    </View>
  );
};

export default Elimination;

const styles = StyleSheet.create({});
