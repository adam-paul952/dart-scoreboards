import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

import useResumeGame, { LoadResumeGameState } from "../hooks/useResumeGame";

import { Text, View } from "../components/Themed";

import { PlayableGameVariants } from "../hooks/useGame";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type ResumeGameProps = NativeStackScreenProps<RootStackParamList, "baseball">;

const ResumeGame = ({ navigation }: ResumeGameProps) => {
  const { onGetAllSavedGames, onDeleteGame } = useResumeGame();

  const [resumeGameState, setGameState] = useState<LoadResumeGameState<any>[]>(
    []
  );

  useEffect(() => {
    onGetAllSavedGames(setGameState);
  }, []);

  const onHandleResumeGame = (
    game: PlayableGameVariants,
    state: LoadResumeGameState<any>
  ) => {
    game === "baseball" && navigation.navigate(game, state);
  };

  const removeSavedGameAlert = (id: number) =>
    Alert.alert("", "Would you like to remove this game?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDeleteGame(id, setGameState) },
    ]);

  return (
    <View style={styles.container}>
      {resumeGameState.map((state) => {
        return (
          <Pressable
            key={state.id}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              styles.buttonContainer,
            ]}
            onLongPress={() =>
              state.id !== undefined ? removeSavedGameAlert(state.id) : null
            }
            onPressOut={() => onHandleResumeGame(state.variant, state)}
          >
            <View>
              <Text style={styles.gameText}>
                {state.variant.charAt(0).toUpperCase() + state.variant.slice(1)}
              </Text>
              {state.players.map((player) => {
                return (
                  <View key={player.id} style={styles.playerRow}>
                    <Text style={styles.textStyle}>{player.name}</Text>
                    <Text style={styles.textStyle}>{player.score}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.bottomAlignColumn}>
              <Text style={styles.textStyle}>
                Inning: {state.undoState.present.round}
              </Text>
              <Text style={styles.textStyle}>
                Turn: {state.undoState.present.turn}
              </Text>
            </View>
            <View style={styles.bottomAlignColumn}>
              <Text style={styles.textStyle}>{state.date}</Text>
              <Text style={[{ textAlign: "right" }, styles.textStyle]}>
                {state.time}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ResumeGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  buttonContainer: {
    // backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
  gameText: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  textStyle: { fontSize: 18 },
  bottomAlignColumn: { alignSelf: "flex-end" },
});

/* TODO:
 *  - X01: Points / Elimination Lives - Global values
 */
