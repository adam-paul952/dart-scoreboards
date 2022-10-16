import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useGame from "../hooks/useGame";

import { View } from "../components/Themed";
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
  } = useGame();
  const navigation = useNavigation();

  // assign targets based on player scores
  const [targets] = useState<Array<number>>(playerTargets);

  // store players that have been eliminated
  const [playerIsOut, setPlayerIsOut] = useState<
    { id: number; name: string }[]
  >([]);

  const onHandleSubmit = () => {
    const hits = playerScore.split("").map((score) => parseInt(score, 10));
    const count = targets.map(
      (num) => hits.filter((hit) => hit === num).length
    );
    let playerScoreIndex = targets.indexOf(currentPlayer.score);
    setSelectedPlayers((prev: IPlayer[]) =>
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
      selectedPlayers.forEach((player: IPlayer) => {
        if (playerIsOut.some((value) => value.name === player.name)) return;
        else if (player.lives === 0) {
          setPlayerIsOut((prev) => [
            ...prev,
            { id: player.id, name: player.name },
          ]);
        }
      });
    }
    changeTurns();
    changeRounds();
  };

  const resetGame = () => {
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.map((player) => {
        player.lives = 0;
        player.killer = false;
        return player;
      })
    );
    // changeTurns();
    setPlayerIsOut([]);
  };

  // when screen is focused re-assign current player to reflect sorted list
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedPlayers((prev: IPlayer[]) =>
        prev.sort((a, b) => a.score - b.score)
      );
      setCurrentPlayer(selectedPlayers[turn]);
    });

    return unsubscribe;
  }, [navigation]);

  // if a player has been added to array as eliminated - then pass turn
  useEffect(() => {
    if (playerIsOut.length >= 1)
      playerIsOut.forEach((player) => {
        if (player.name === currentPlayer.name) {
          changeTurns();
          changeRounds();
        }
      });
  }, [currentPlayer]);

  // check length of eliminated players - if only one player remaining then declare winner
  useEffect(() => {
    if (playerIsOut.length === selectedPlayers.length - 1) {
      gameOverAlert({
        playerName: currentPlayer.name,
        resetGame,
        navigation,
      });
    }
  }, [playerIsOut]);

  return (
    // main container
    <View style={{ flex: 1, paddingTop: 10 }}>
      {/* scoreboard container */}
      <View style={{ flex: 2 }}>
        <KillerHeader />
        {/* scoreboard body */}
        <View>
          {selectedPlayers.map((player: IPlayer) => {
            return (
              <KillerScoreboardBody
                key={player.name}
                player={player}
                currentPlayer={currentPlayer.id}
              />
            );
          })}
        </View>
        {/* end scoreboard body */}
      </View>
      {/* end scoreboard container */}
      {/* round info */}
      <View></View>
      {/* end round info */}
      {/* calculator buttons container */}
      <View>
        <CalculatorButtons
          variant="killer"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("killer")}
          setValue={setPlayerScore}
        />
      </View>
      {/* end calculator buttons container */}
    </View>
    // end main container
  );
};

export default Killer;

const styles = StyleSheet.create({});
