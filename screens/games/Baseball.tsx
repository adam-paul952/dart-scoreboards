import React, { useEffect, useRef } from "react";
import { Alert, StyleSheet } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useResumeGame from "../../hooks/useResumeGame";

import { View } from "../../components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import GameScoreboardHeader from "@components/scoreboard/header/GameScoreboardHeader";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import BaseballRoundInfo from "@scoreboard/round-info/BaseballRoundInfo";

import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";
import GameScoreboardBody from "@components/scoreboard/body/GameScoreboardBody";

type BaseballRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "baseball"
>;

let winner: { id: number; name: string } = {
  id: 0,
  name: "",
};

const Baseball = ({ route, navigation }: BaseballRouteProps) => {
  // keep device awake while on game screen
  useKeepAwake();

  const variant = route.name;

  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const { onAddGame } = useResumeGame();
  const {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    onDeleteInput,
    turn,
    changeTurns,
    round,
    setRound,
    changeRounds,
    currentPlayer,
    assignCurrentPlayerHighScore,
    playerIsOut,
    setPlayerIsOut,
    setTurn,
    setCurrentPlayer,
    onResetGame,
    nextPlayer,
  } = useGame();

  const [undoState, { set: setUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
      leadingScore: 0,
    });

  const { present: presentPlayer } = undoState;

  const roundRef = useRef(round);

  // set initial player scorelist filled with 0 - for display purposes
  useEffect(() => {
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.scoreList = new Array(10).fill("");
        return player;
      })
    );
  }, []);

  const handleScoreInput = () => {
    // convert playerscore to number
    let roundScore = parseInt(playerScore, 10);
    // if score is NaN - score = 0
    if (isNaN(roundScore)) roundScore = 0;
    // assign score to proper index in scorelist
    round <= 9
      ? (currentPlayer.scoreList[round - 1] = roundScore)
      : (currentPlayer.scoreList[9] += roundScore);
    // calculate total by reducing scorelist
    const overallScore = currentPlayer.scoreList.reduce((a, b) => a + b);

    assignCurrentPlayerHighScore(currentPlayer);
    changeTurns();
    changeRounds();
    // assign new totals to current player
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id !== currentPlayer.id
          ? player
          : {
              ...player,
              score: overallScore,
              scoreList: currentPlayer.scoreList,
            }
      )
    );
    // if current player score is greater then leading score, set leading score
    overallScore > leadingScore && setLeadingScore(overallScore);
  };

  // handle score submit
  const onHandleTurnChange = () => {
    handleScoreInput();
    roundRef.current = round;
    // if round is = 9 and turn is last turn check for duplicates or winner
    if (round === 9 && turn === selectedPlayers.length - 1) {
      selectedPlayers.filter((player) => player.score === leadingScore).length >
      1
        ? playExtraInnings()
        : declareWinner();
    } else if (
      round > 9 &&
      roundRef.current === presentPlayer.round &&
      // since state update is batched we need to manually add
      // if not always returns true
      currentPlayer.score + parseInt(playerScore, 10) !== leadingScore
    ) {
      selectedPlayers.filter((player) => player.score === leadingScore)
        .length === 1 && declareWinner();
    }
  };

  const playExtraInnings = () => {
    selectedPlayers.forEach((player) => {
      if (playerIsOut.some((value) => value.name === player.name)) return;
      else if (player.score < leadingScore) {
        setPlayerIsOut((prev) => prev.concat(player));
      }
    });

    Alert.alert("", "Extra Innings!", [{ text: "Ok", style: "cancel" }]);
  };

  const declareWinner = () => {
    // find winner's name
    selectedPlayers.forEach((player) => {
      if (player.score === leadingScore)
        winner = { id: player.id, name: player.name };
    });

    if (winner) {
      selectedPlayers.forEach((player) => {
        onUpdatePlayerStats(variant, player, winner);
      });
    }

    setGameOver({ isOver: true, game: variant });
    // alert game over with winner name
    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
      variant,
    });
  };

  const onUndo = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id === presentPlayer.player.id ? presentPlayer.player : player
      )
    );

    setCurrentPlayer(presentPlayer.player);
    setTurn(presentPlayer.turn);
    setRound(presentPlayer.round);
    setLeadingScore(presentPlayer.leadingScore);
  };

  const onHandleSubmit = () => {
    let player = JSON.parse(JSON.stringify(currentPlayer));
    let nextPlayerUndo = JSON.parse(JSON.stringify(nextPlayer));
    // assign state to undo redo
    setUndoState({
      turn,
      round,
      player,
      leadingScore,
      nextPlayer: nextPlayerUndo,
    });

    onHandleTurnChange();
  };

  useEffect(() => {
    if (playerIsOut.length >= 1)
      playerIsOut.forEach((player) => {
        if (player.name === currentPlayer.name) {
          changeTurns();
          changeRounds();
        }
      });
  }, [currentPlayer]);

  const routes = navigation.getState()?.routes;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const previousScreen = routes[routes.length - 2].name;
      const resumeGameState = route.params;
      if (previousScreen === "resume-game" && resumeGameState !== undefined) {
        // loop over undo past to assign to undo state
        // maybe create an extra function in useUndoRedo to handle this?
        resumeGameState.undoState.past.forEach((item) => setUndoState(item));
        setUndoState(resumeGameState.undoState.present);
        setTurn(
          () =>
            (resumeGameState.undoState.present.turn + 1) %
            resumeGameState.players.length
        );
        setRound(() =>
          turn === 0
            ? resumeGameState.undoState.present.round + 1
            : resumeGameState.undoState.present.round
        );

        setCurrentPlayer(resumeGameState.undoState.present.nextPlayer);
        setLeadingScore(resumeGameState.undoState.present.leadingScore);
        setSelectedPlayers(() => resumeGameState.players);
      } else return;
    });

    return unsubscribe;
  }, [navigation]);

  const addGame = () =>
    route.params?.id !== undefined
      ? onAddGame(variant, selectedPlayers, undoState, route.params.id)
      : onAddGame(variant, selectedPlayers, undoState);

  return (
    <View style={styles.container}>
      <CustomStackScreenHeader
        canUndo={canUndo}
        onUndo={onUndo}
        onResetGame={onResetGame}
        onAddGame={addGame}
        variant={variant}
        navigation={navigation}
      />
      <View style={styles.scoreboardContainer}>
        <GameScoreboardHeader variant={variant} />
        <GameScoreboardBody
          variant={variant}
          selectedPlayers={selectedPlayers}
          currentPlayer={currentPlayer.id}
          playersOut={playerIsOut}
        />
      </View>
      <View>
        <BaseballRoundInfo
          currentPlayer={currentPlayer}
          round={round}
          playerScore={playerScore}
          leadingScore={leadingScore}
        />
        <CalculatorButtons
          variant={variant}
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput(variant)}
          setValue={setPlayerScore}
        />
      </View>
    </View>
  );
};

export default Baseball;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scoreboardContainer: { flex: 2, marginHorizontal: 5 },
});
