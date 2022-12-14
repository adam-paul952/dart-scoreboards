import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet } from "react-native";

import useResumeGame, { LoadResumeGameState } from "../hooks/useResumeGame";

import { Text, View } from "../components/Themed";

import { IPlayer } from "@context/PlayerContext";
import { PlayableGameVariants } from "../hooks/useGame";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type ResumeGameProps = NativeStackScreenProps<RootStackParamList, "baseball">;

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
    game === "baseball" &&
      navigation.navigate({
        name: game,
        params: {
          id: state.id,
          players: state.players,
          undoState: state.undoState,
        },
      });
    game === "cricket" &&
      navigation.navigate(game, {
        id: state.id,
        players: state.players,
        undoState: state.undoState,
      });
  };

  const removeSavedGameAlert = (id: number) =>
    Alert.alert("", "Would you like to remove this game?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDeleteGame(id, setGameState) },
    ]);

  const renderItem = ({
    item,
  }: {
    item: LoadResumeGameState<GameUndoState>;
  }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.buttonContainer,
        ]}
        onLongPress={() =>
          item.id !== undefined ? removeSavedGameAlert(item.id) : null
        }
        onPressOut={() => onHandleResumeGame(item.variant, item)}
      >
        <View>
          <Text style={styles.gameText}>
            {item.variant.charAt(0).toUpperCase() + item.variant.slice(1)}
          </Text>
          {item.players.map((player) => {
            return (
              <View key={player.id} style={styles.playerRow}>
                <Text style={styles.textStyle}>{player.name}</Text>
                <Text style={styles.textStyle}>{player.score}</Text>
                {item.variant === "cricket" ? (
                  <Text style={[styles.textStyle]}>
                    {calculateHits(player.scoreList)} mrks
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>
        <View style={styles.bottomAlignColumn}>
          {item.variant === "elimination" ? <Text>Lives:</Text> : null}
          {item.variant === "x01" ? <Text>Points:</Text> : null}
          {item.variant === "baseball" ? (
            <Text style={styles.textStyle}>
              Inning: {item.undoState.present.round}
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              Round: {item.undoState.present.round}
            </Text>
          )}

          <Text style={styles.textStyle}>
            Turn: {item.undoState.present.turn}
          </Text>
        </View>
        <View style={styles.bottomAlignColumn}>
          <Text style={styles.textStyle}>{item.date}</Text>
          <Text style={[{ textAlign: "right" }, styles.textStyle]}>
            {item.time}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resumeGameState}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
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
