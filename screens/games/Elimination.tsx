import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";

import { View } from "../../components/Themed";
import CustomStackScreenHeader from "@components/scoreboard/CustomStackScreenHeader";
import EliminationHeader from "@components/scoreboard/header/EliminationHeader";
import EliminationScoreboardBody from "@components/scoreboard/body/EliminationScoreboardBody";
import EliminationRoundInfo from "@components/scoreboard/round-info/EliminationRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

import gameOverAlert from "@components/GameOverAlert";

// set variables
let winner: { id?: number; name: string } = {
  id: undefined,
  name: "",
};

let roundScore = 0;

const Elimination = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
  const { onUpdatePlayerStats, setGameOver } = usePlayerStats();
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

  const navigation = useNavigation();

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

  // if player has 0 lives; player is out change turns
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

    setGameOver({ isOver: true, game: "elimination" });

    // alert game over with winner name
    gameOverAlert({
      playerName: winner.name,
      onResetGame,
      navigation,
      variant: "elimination",
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

  return (
    <View style={styles.container}>
      <CustomStackScreenHeader
        title={"Elimination"}
        onUndo={onUndo}
        canUndo={canUndo}
        onResetGame={onResetGame}
      />
      <View style={styles.scoreboardContainer}>
        <EliminationHeader />
        {selectedPlayers.map((player) => (
          <EliminationScoreboardBody
            key={player.name}
            player={player}
            currentPlayer={currentPlayer.id}
          />
        ))}
      </View>
      <EliminationRoundInfo
        currentPlayer={currentPlayer}
        round={round}
        playerScore={playerScore}
      />
      <View>
        <CalculatorButtons
          variant="elimination"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("elimination")}
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
