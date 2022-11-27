import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";

import { Text, TextInput, View } from "../../components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import KillerHeader from "@scoreboard/header/KillerHeader";
import KillerScoreboardBody from "@components/scoreboard/body/KillerScoreboardBody";
import CalculatorButtons from "@components/scoreboard/calculator-buttons/CalculatorButtons";

import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type KillerProps = NativeStackScreenProps<RootStackParamList, "killer">;

const Killer = ({ route }: KillerProps) => {
  const { playerTargets } = route.params;
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const {
    onDeleteInput,
    currentPlayer,
    playerScore,
    setPlayerScore,
    setCurrentPlayer,
    turn,
    round,
    changeTurns,
    changeRounds,
    playerIsOut,
    setPlayerIsOut,
    onResetGame,
  } = useGame();
  const navigation = useNavigation();
  const [playerState, { set: setCurrentState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
    });

  // assign targets based on player scores
  const [targets] = useState<Array<number>>(playerTargets);

  const onHandleSubmit = () => {
    const hits = playerScore.split("").map((score) => parseInt(score, 10));
    const count = targets.map(
      (num) => hits.filter((hit) => hit === num).length
    );
    let playerScoreIndex = targets.indexOf(currentPlayer.score);
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        if (currentPlayer.id === player.id) {
          player.lives += count[playerScoreIndex];
          if (player.lives === 5) player.killer = true;
          else if (player.lives > 5) {
            let difference = player.lives - 5;
            player.lives = 5 - difference;
          }
          return player;
        } else if (
          currentPlayer.killer === true &&
          count[targets.indexOf(player.score)] > 0
        ) {
          player.lives -= count[targets.indexOf(player.score)];
          if (player.lives < 0) player.lives = 0;
          return player;
        } else {
          return player;
        }
      })
    );
    if (currentPlayer.killer === true) {
      selectedPlayers.forEach((player) => {
        if (playerIsOut.some((value) => value.name === player.name)) return;
        else if (player.lives === 0) {
          setPlayerIsOut((prev) => [...prev, player]);
        }
      });
    }

    changeTurns();
    changeRounds();
  };

  // when screen is focused re-assign current player to reflect sorted list
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedPlayers((prev) => prev.sort((a, b) => a.score - b.score));
      setCurrentPlayer(selectedPlayers[turn]);
    });

    return unsubscribe;
  }, [navigation]);

  // if a player has been added to array as eliminated - then pass turn
  useEffect(() => {
    if (playerIsOut.length >= 1)
      playerIsOut.forEach((player) => {
        if (player.id === currentPlayer.id) {
          changeTurns();
          changeRounds();
        }
      });
  }, [currentPlayer]);

  // check length of eliminated players - if only one player remaining then declare winner
  useEffect(() => {
    if (playerIsOut.length === selectedPlayers.length - 1) {
      let winner = selectedPlayers.filter((player) => {
        if (!playerIsOut.includes(player)) {
          return player;
        }
      });

      assignPlayerStats(winner[0]);
    }
  }, [playerIsOut]);

  const assignPlayerStats = (winner: IPlayer) => {
    selectedPlayers.forEach((player) => {
      onUpdatePlayerStats("killer", player, winner);
    });

    setGameOver({ isOver: true, game: "killer" });

    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
      variant: "killer",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomStackScreenHeader
        title="Killer"
        onUndo={undoTurn}
        canUndo={canUndo}
        onResetGame={onResetGame}
      />
      <ScrollView style={{}}>
        <KillerHeader />
        {selectedPlayers.map((player) => {
          return (
            <KillerScoreboardBody
              key={player.name}
              player={player}
              currentPlayer={currentPlayer.id}
            />
          );
        })}
      </ScrollView>
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              width: "45%",
              paddingHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                textDecorationLine: "underline",
              }}
            >
              {currentPlayer.name} to throw
            </Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text style={[{ textAlign: "center" }]}>Points</Text>
            <TextInput
              style={styles.scoreInput}
              editable={false}
              showSoftInputOnFocus={false}
              value=""
              textAlign="center"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderTopWidth: 1,
            borderTopColor: "lightgray",
          }}
        >
          <Text style={{ fontSize: 15 }}>Round: {round}</Text>
          <Text style={{ fontSize: 15 }}>Place</Text>
          <Text style={{ fontSize: 15 }}>Holder</Text>
        </View>
      </>
      <View style={{}}>
        <CalculatorButtons
          variant="killer"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("killer")}
          setValue={setPlayerScore}
        />
      </View>
    </View>
  );
};

export default Killer;

const styles = StyleSheet.create({
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
});
