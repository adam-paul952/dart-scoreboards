import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { usePlayerState, IPlayer } from "@context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useResumeGame from "../../hooks/useResumeGame";

import { View } from "@components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import GameScoreboardHeader from "@components/scoreboard/header/GameScoreboardHeader";
import GameScoreboardBody from "@components/scoreboard/body/GameScoreboardBody";
import KillerRoundInfo from "@components/scoreboard/round-info/KillerRoundInfo";
import CalculatorButtons from "@components/scoreboard/calculator-buttons/CalculatorButtons";
import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type KillerProps = NativeStackScreenProps<RootStackParamList, "killer">;

const Killer = ({ route, navigation }: KillerProps) => {
  // keep device unlocked during game
  useKeepAwake();

  const { name, params } = route;
  // const { playerTargets } = params;
  const variant = name;
  const routes = navigation.getState()?.routes;

  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const { onAddGame } = useResumeGame();
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
    nextPlayer,
    setTurn,
    setRound,
    calculateHits,
    limitNumberOfHits,
  } = useGame();

  const [undoState, { set: setUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
    });

  const { present: presentTurn } = undoState;

  // useEffect(() => {
  //   console.log(`-----------------`);
  //   console.log(`Present State: `);
  //   console.log(presentTurn);
  // }, [presentTurn]);

  // assign targets based on player scores
  const [targets, setPlayerTargets] = useState<Array<number>>(
    params.playerTargets
  );

  useEffect(() => {
    console.log(`Targets: `, targets);
  }, [targets]);

  const onHandleTurnChange = () => {
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
        } else return player;
      })
    );
    if (currentPlayer.killer === true) {
      selectedPlayers.forEach((player) => {
        if (playerIsOut.some((value) => value.id === player.id)) return;
        else if (player.lives === 0) {
          setPlayerIsOut((prev) => prev.concat(player));
        }
      });
    }

    changeTurns();
    changeRounds();
  };

  const onDeclareWinner = (winner: IPlayer) => {
    selectedPlayers.forEach((player) => {
      onUpdatePlayerStats(variant, player, winner);
    });

    setGameOver({ isOver: true, game: variant });

    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
      variant,
    });
  };

  const onUndoTurn = () => {
    undoTurn();

    setSelectedPlayers((prev) =>
      prev.map((player) =>
        presentTurn.player.id ? presentTurn.player : player
      )
    );
    setCurrentPlayer(presentTurn.player);
    setTurn(presentTurn.turn);
    setRound(presentTurn.round);
  };

  const onHandleSubmit = () => {
    let player = JSON.parse(JSON.stringify(currentPlayer));
    let nextPlayerUndo = JSON.parse(JSON.stringify(nextPlayer));

    setUndoState({
      turn,
      round,
      player,
      nextPlayer: nextPlayerUndo,
    });

    onHandleTurnChange();
  };

  // when screen is focused re-assign current player to reflect sorted list
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (routes[routes.length - 2].name === "killer-setup") {
        setSelectedPlayers((prev) => prev.sort((a, b) => a.score - b.score));
        setCurrentPlayer(selectedPlayers[turn]);
        setPlayerTargets((prev) => prev.sort((a, b) => a - b));
      } else if (routes[routes.length - 2].name === "resume-game") {
        if ("players" in params && "undoState" in params) {
          const { players, undoState, playerTargets } = params;

          setSelectedPlayers(() => players);
          setCurrentPlayer(undoState.present.nextPlayer);
          setPlayerTargets(playerTargets);
        }
      } else return;
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
      let winner = selectedPlayers.filter(
        (player) => !playerIsOut.includes(player) && player
      );

      onDeclareWinner(winner[0]);
    }
  }, [playerIsOut]);

  const addGame = () =>
    onAddGame(variant, selectedPlayers, undoState, targets.toString());

  const calculatedHits = calculateHits(playerScore.split(""), targets);

  React.useEffect(() => {
    console.log(`Calculated Hits: `, calculatedHits);
  }, [calculatedHits]);

  // useEffect(() => {
  //   limitNumberOfHits(calculatedHits);
  // }, [playerScore.split("")]);

  return (
    <View style={{ flex: 1 }}>
      <CustomStackScreenHeader
        onUndo={onUndoTurn}
        canUndo={canUndo}
        onResetGame={onResetGame}
        onAddGame={addGame}
        variant={variant}
        navigation={navigation}
      />
      <ScrollView style={{}}>
        <GameScoreboardHeader variant={variant} />
        <GameScoreboardBody
          variant={variant}
          selectedPlayers={selectedPlayers}
          currentPlayer={currentPlayer.id}
        />
      </ScrollView>
      <KillerRoundInfo currentPlayer={currentPlayer} round={round} />
      <View style={{}}>
        <CalculatorButtons
          variant="killer"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput(variant)}
          setValue={setPlayerScore}
          hitTargets={calculatedHits}
          playerTargets={targets}
        />
      </View>
    </View>
  );
};

export default Killer;

const styles = StyleSheet.create({});
