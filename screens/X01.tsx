import React, { useEffect, useState } from "react";

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

  // state to manage score input
  const [playerScore, setPlayerScore] = useState<string>("");

  // state to manage input error and disable buttons
  const [inputError, setInputError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  // check user input for error
  const checkForInputError = () => {
    if (playerScore.length === 3) {
      const score = parseInt(playerScore, 10);
      // check if input > 180 add error
      if (score > 180) {
        setInputError(true);
        setDisabled(true);
      }
      // else no error
      else {
        setInputError(false);
        setDisabled(false);
      }
    } else if (playerScore.length === 0) {
      setInputError(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    console.log(`Player Score: ${playerScore}`);
  });

  useEffect(() => {
    checkForInputError();
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <X01Header />
        <>
          <X01ScoreboardBody playerList={playerList} />
        </>
      </View>
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextInput
            style={
              inputError
                ? [styles.scoreInput, styles.scoreInputError]
                : styles.scoreInput
            }
            maxLength={3}
            value={playerScore}
          />
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            No Outshots Available
          </Text>
        </View>
        <View>
          <X01PlayerInfo />
          <CalculatorButtons
            data={regularButtons}
            value={playerScore}
            setValue={setPlayerScore}
            disabled={disabled}
          />
        </View>
      </>
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
    fontSize: 25,
    borderRadius: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  scoreInputError: {
    borderColor: "red",
    backgroundColor: "rgba(255,0,0,0.2)",
    color: "red",
    fontWeight: "600",
  },
});
