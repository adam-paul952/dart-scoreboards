import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet } from "react-native";

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
    game === "cricket" && navigation.navigate(game, state);
  };

  const removeSavedGameAlert = (id: number) =>
    Alert.alert("", "Would you like to remove this game?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDeleteGame(id, setGameState) },
    ]);

  const renderItem = ({ item }: { item: LoadResumeGameState<any> }) => {
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
