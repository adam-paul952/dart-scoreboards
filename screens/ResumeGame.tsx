import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet } from "react-native";

import useResumeGame, { LoadResumeGameState } from "../hooks/useResumeGame";

import { Text, View } from "../components/Themed";

import { IPlayer } from "@context/PlayerContext";
import { PlayableGameVariants } from "../hooks/useGame";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type ResumeGameProps = NativeStackScreenProps<
  RootStackParamList,
  "resume-game"
>;

export type StateToPass = Omit<
  LoadResumeGameState<GameUndoState>,
  "date" | "time" | "variant"
>;

interface BaseballUndoState {
  turn: number;
  round: number;
  player: IPlayer;
  nextPlayer: IPlayer;
  leadingScore: number;
}
interface CricketUndoState extends BaseballUndoState {
  disabledButtons: boolean[];
  playerScore: string;
}

export type GameUndoState = BaseballUndoState & CricketUndoState;

const ResumeGame = ({ navigation }: ResumeGameProps) => {
  const { onGetAllSavedGames, onDeleteGame } = useResumeGame();

  const [resumeGameState, setGameState] = useState<
    LoadResumeGameState<GameUndoState>[]
  >([]);

  useEffect(() => {
    onGetAllSavedGames(setGameState);
  }, []);

  // useEffect(() => {
  //   resumeGameState.forEach((game) => {
  //     game.variant === "x01" && console.log(game);
  //   });
  // }, [resumeGameState]);

  // calculate hits for button display
  const calculateHits = (array: Array<number>) =>
    [
      array.filter((hitNum) => hitNum === 20).length,
      array.filter((hitNum) => hitNum === 19).length,
      array.filter((hitNum) => hitNum === 18).length,
      array.filter((hitNum) => hitNum === 17).length,
      array.filter((hitNum) => hitNum === 16).length,
      array.filter((hitNum) => hitNum === 15).length,
      array.filter((hitNum) => hitNum === 25).length,
    ].reduce((a, b) => a + b);

  const onHandleResumeGame = (
    game: PlayableGameVariants,
    state: LoadResumeGameState<GameUndoState>
  ) => {
    game === "baseball" || game === "cricket"
      ? navigation.navigate(game, {
          id: state.id,
          players: state.players,
          undoState: state.undoState,
        })
      : game === "elimination" || game === "x01"
      ? navigation.navigate(game, {
          id: state.id,
          players: state.players,
          undoState: state.undoState,
          settings: state.settings,
        })
      : null;
  };

  const removeSavedGameAlert = (id: number) =>
    Alert.alert("", "Would you like to remove this game?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDeleteGame(id, setGameState) },
    ]);

  const keyExtractor = (_: any, index: number) => index.toString();

  const renderItem = ({
    item,
  }: {
    item: LoadResumeGameState<GameUndoState>;
  }) => {
    const { id, variant, players, undoState, settings, date, time } = item;
    return (
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.buttonContainer,
        ]}
        onLongPress={() => (id !== undefined ? removeSavedGameAlert(id) : null)}
        onPressOut={() => onHandleResumeGame(variant, item)}
      >
        <View>
          <Text style={styles.gameText}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Text>
          {players.map((player) => {
            return (
              <View key={player.id} style={styles.playerRow}>
                <Text style={styles.textStyle}>{player.name}</Text>
                <Text style={styles.textStyle}>{player.score}</Text>
                <Text style={[styles.textStyle]}>
                  {variant === "cricket"
                    ? `${calculateHits(player.scoreList)} mrks`
                    : variant === "elimination"
                    ? `${player.lives}`
                    : null}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.bottomAlignColumn}>
          <Text style={styles.textStyle}>
            {variant === "elimination"
              ? "Lives: "
              : variant === "x01"
              ? "Points: "
              : null}
            {settings}
          </Text>
          {variant === "x01" ? null : (
            <>
              <Text style={styles.textStyle}>
                {variant === "baseball" ? "Inning: " : "Round: "}
                {undoState.present.round}
              </Text>
              <Text style={styles.textStyle}>
                Turn: {undoState.present.turn}
              </Text>
            </>
          )}
        </View>
        <View style={styles.bottomAlignColumn}>
          <Text style={styles.textStyle}>{date}</Text>
          <Text style={[{ textAlign: "right" }, styles.textStyle]}>{time}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resumeGameState}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
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
    marginVertical: 5,
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
