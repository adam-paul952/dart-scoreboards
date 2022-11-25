import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { usePlayerState } from "@context/PlayerContext";
import useGame from "../../hooks/useGame";

import { Text, TextInput, View } from "@components/Themed";
import CalculatorButtons from "@components/scoreboard/calculator-buttons/CalculatorButtons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type KillerSetupProps = NativeStackScreenProps<
  RootStackParamList,
  "killer-setup"
>;

let targets: Array<number> = [];

const KillerSetup = ({ navigation }: KillerSetupProps) => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();

  const {
    playerScore,
    setPlayerScore,
    onDeleteInput,
    currentPlayer,
    changeTurns,
    turn,
  } = useGame();

  let playerTarget = 0;

  const [isInputError, setInputError] = useState<boolean>(false);

  playerTarget = parseInt(playerScore, 10);

  const onHandleSubmit = () => {
    // convert player score to a number
    if (isNaN(playerTarget)) return;
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        if (currentPlayer.id !== player.id) return player;
        else {
          player.score = playerTarget;
          return player;
        }
      })
    );
    targets.push(playerTarget);
    changeTurns();
    // if last player has shot close modal
    if (turn === selectedPlayers.length - 1) {
      navigation.navigate("killer", {
        playerTargets: targets,
      });
    }
  };

  const checkForInputError = () => {
    if (playerTarget > 20 || playerTarget < 1) return true;
    else if (checkForDuplicateTargets()) return true;
    else return false;
  };

  const checkForDuplicateTargets = () =>
    selectedPlayers.some((player) => player.score === playerTarget);

  useEffect(() => {
    setInputError(checkForInputError());
  }, [playerScore]);

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Players to throw with&nbsp;
        <Text style={{ fontWeight: "600" }}>opposite</Text>
        &nbsp;main throwing hand to get target
      </Text>
      <Text style={{ fontSize: 15, paddingHorizontal: 10 }}>
        (eg. Right handed players throw with left and vice-versa)
      </Text>
      <ScrollView style={styles.playerListContainer}>
        {selectedPlayers.map((player) => {
          return (
            <View key={player.name} style={styles.playerListRow}>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.textStyle}>{player.name}</Text>
              </View>
              <View>
                <Text style={styles.textStyle}>{player.score}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.textStyle, { paddingVertical: 5 }]}>Target</Text>
        <TextInput
          style={[isInputError && styles.scoreInputError, styles.scoreInput]}
          editable={false}
          showSoftInputOnFocus={false}
          value={playerScore}
          textAlign="center"
        />
      </View>
      <View>
        <CalculatorButtons
          variant="killer-setup"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("killer-setup")}
          setValue={setPlayerScore}
          disabled={isInputError}
        />
      </View>
    </View>
  );
};

export default KillerSetup;

const styles = StyleSheet.create({
  container: { flex: 1 },
  playerListContainer: { flex: 2, paddingTop: 20 },
  infoText: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  playerListRow: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },
  textStyle: { fontSize: 20 },
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 26,
    borderRadius: 15,
    width: "33.33%",
  },
  scoreInputError: {
    borderColor: "red",
    backgroundColor: "rgba(255,0,0,0.2)",
    color: "red",
    fontWeight: "600",
  },
});
