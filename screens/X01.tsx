import React, { useState } from "react";

import { StyleSheet } from "react-native";

import { Text, TextInput, View } from "@components/Themed";
import { usePlayerState } from "../context/PlayerContext";

import X01Header from "@scoreboard/header/X01Header";
import X01ScoreboardBody from "@scoreboard/body/X01ScoreboardBody";
import X01PlayerInfo from "@scoreboard/round-info/X01PlayerInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

import { regularButtons } from "@scoreboard/calculator-buttons/constants";

const X01 = () => {
  const { playerList } = usePlayerState();

  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmitScore = () => {
    const validateInput = /^d+$/;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <X01Header />
        <View>
          <X01ScoreboardBody playerList={playerList} />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextInput style={styles.scoreInput} maxLength={3} />
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            No Outshots Available
          </Text>
        </View>
        <View>
          <X01PlayerInfo />
          <CalculatorButtons data={regularButtons} />
        </View>
      </View>
    </View>
  );
};

export default X01;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
  scoreboardRow: { flexDirection: "row", justifyContent: "center" },
  playerHeaderColumn: {
    flex: 3,
    borderRightColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  pointsHeaderColumn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    width: "25%",
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
});
