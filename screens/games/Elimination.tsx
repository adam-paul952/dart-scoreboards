import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

import { usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";
import useResumeGame from "../../hooks/useResumeGame";

import { View } from "../../components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import GameScoreboardHeader from "@components/scoreboard/header/GameScoreboardHeader";
import GameScoreboardBody from "@components/scoreboard/body/GameScoreboardBody";
import EliminationRoundInfo from "@components/scoreboard/round-info/EliminationRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

import gameOverAlert from "@components/GameOverAlert";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type EliminationProps = NativeStackScreenProps<
  RootStackParamList,
  "elimination"
>;

// set variables
let winner: { id?: number; name: string } = {
  id: undefined,
  name: "",
};

let roundScore = 0;

const Elimination = ({ route, navigation }: EliminationProps) => {
  // keep device unlocked during game
  useKeepAwake();

  const { name, params } = route;
  const variant = name;

  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
  const { onAddGame } = useResumeGame();
  const {
    currentPlayer,
    playerScore,
    setPlayerScore,
    round,
    setRound,
    onDeleteInput,
    leadingScore,
    setLeadingScore,
    changeTurns,
    changeRounds,
    turn,
    assignCurrentPlayerHighScore,
    setCurrentPlayer,
    setTurn,
    nextPlayer,
    onResetGame,
  } = useGame();

  const [undoState, { set: setUndoState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
      leadingScore: 0,
    });

  const { present: presentTurn } = undoState;

  const [eliminationLives] = useState(currentPlayer.lives);

  useEffect(() => {
    if (currentPlayer.lives === 0) {
      changeTurns();
      changeRounds();
    }
  }, [currentPlayer]);

  const declareWinner = () => {
    selectedPlayers.forEach((player) => {
      if (player.lives > 0) {
        winner = player;
      }

      onUpdatePlayerStats("elimination", player, winner);
    });

    setGameOver({ isOver: true, game: variant });

    // alert game over with winner name
    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
      variant,
      assignedLives: eliminationLives,
    });
  };

  const onChangeTurns = () => {
    // convert playerScore to number
    roundScore = parseInt(playerScore, 10);
    // if playerScore isn't a number -> score = 0
    if (isNaN(roundScore)) roundScore = 0;
    // assign score to scorelist
    currentPlayer.scoreList.push(roundScore);
    assignCurrentPlayerHighScore(currentPlayer);
  };

  const onHandleTurnChange = () => {
    onChangeTurns();
    // if it's the first turn of the game and the player doesn't score - player doesn't lose a life
    if (round === 1 && turn === 0 && roundScore === 0) {
      setSelectedPlayers((prev) =>
        prev.map((player) => {
          if (player.id === currentPlayer.id) {
            player.score = roundScore;
            return player;
          } else return player;
        })
      );
    }
    // check to see if player score is > previous playerscore
    else if (roundScore > leadingScore) {
      // set leading score to new score
      setLeadingScore(roundScore);
      // set player's score to current score
      setSelectedPlayers((prev) =>
        prev.map((player) => {
          if (player.id === currentPlayer.id) {
            player.score = roundScore;
            return player;
          } else return player;
        })
      );
    } else {
      setLeadingScore(roundScore);

      setSelectedPlayers((prev) =>
        prev.map((player) => {
          if (player.id === currentPlayer.id) {
            player.score = roundScore;
            player.lives -= 1;
            return player;
          } else return player;
        })
      );
    }

    changeTurns();
    changeRounds();

    // if only one player left with lives game is over
    const checkForWinningPlayer: number = selectedPlayers.filter(
      (player) => player.lives > 0
    ).length;

    if (checkForWinningPlayer === 1) declareWinner();
  };

  const onHandleSubmit = () => {
    setUndoState({
      turn,
      round,
      player: JSON.parse(JSON.stringify(currentPlayer)),
      leadingScore,
      nextPlayer: JSON.parse(JSON.stringify(nextPlayer)),
    });

    onHandleTurnChange();
  };

  // handle setting undo state on Undo
  const onUndo = () => {
    undoTurn();
    setSelectedPlayers((prev) =>
      prev.map((player) =>
        player.id === presentTurn.player.id ? presentTurn.player : player
      )
    );

    setCurrentPlayer(presentTurn.player);
    setTurn(presentTurn.turn);
    setRound(presentTurn.round);
    setLeadingScore(presentTurn.leadingScore);
  };

  // handle saving game details if game is unfinished
  const routes = navigation.getState()?.routes;

  const addGame = () =>
    params?.id !== undefined
      ? onAddGame(
          variant,
          selectedPlayers,
          undoState,
          eliminationLives,
          params?.id
        )
      : onAddGame(variant, selectedPlayers, undoState, eliminationLives);

  // handle setting state if user is resuming a saved game
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const previousScreen = routes[routes.length - 2].name;
      const resumeGameState = params;

      if (previousScreen === "resume-game" && resumeGameState !== undefined) {
        const { players, undoState } = resumeGameState;
        const { present } = undoState;

        setSelectedPlayers(() => players);
        setCurrentPlayer(present.nextPlayer);
        setTurn(() => (present.turn + 1) % resumeGameState.players.length);
        setRound(() => (turn === 0 ? present.round + 1 : present.round));
        setLeadingScore(present.leadingScore);
      } else return;
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomStackScreenHeader
        onUndo={onUndo}
        canUndo={canUndo}
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
        />
      </View>
      <EliminationRoundInfo
        currentPlayer={currentPlayer}
        round={round}
        playerScore={playerScore}
      />
      <View>
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

export default Elimination;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  scoreboardContainer: { flex: 2 },
});
