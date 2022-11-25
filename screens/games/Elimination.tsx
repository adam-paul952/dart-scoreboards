import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState } from "../../context/PlayerContext";
import useGame from "../../hooks/useGame";
import useUndoRedo from "../../hooks/useUndoRedo";
import usePlayerStats from "../../hooks/usePlayerStats";

import { View } from "../../components/Themed";
import EliminationHeader from "@components/scoreboard/header/EliminationHeader";
import EliminationScoreboardBody from "@components/scoreboard/body/EliminationScoreboardBody";
import EliminationRoundInfo from "@components/scoreboard/round-info/EliminationRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

import gameOverAlert from "@components/GameOverAlert";
import CustomButton from "@components/CustomButton";

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
  } = useGame();

  const navigation = useNavigation();

  const [playerState, { set: setCurrentState, undo: undoTurn, canUndo }] =
    useUndoRedo({
      turn: 0,
      round: 1,
      player: { ...currentPlayer },
      nextPlayer: {},
      leadingScore: 0,
    });

  const { present: presentTurn } = playerState;

  useEffect(() => {
    console.log(`---------------------`);
    console.log(`Present Turn: `);
    console.log(presentTurn);
    console.log(`    `);
  }, [presentTurn]);

  // set variables
  let winner: { id?: number; name: string } = {
    id: undefined,
    name: "",
  };

  let roundScore = 0;

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

  const onHandleSubmit = () => {
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
      prev.map((player) => {
        if (player.id === presentTurn.player.id) {
          return presentTurn.player;
        } else {
          return player;
        }
      })
    );

    setCurrentPlayer(presentTurn.player);
    setTurn(presentTurn.turn);
    setRound(presentTurn.round);
    setLeadingScore(presentTurn.leadingScore);
  };

  // reset game if playing again
  const onResetGame = () => {
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.score = 0;
        player.scoreList = [];
        player.lives = eliminationLives;
        return player;
      })
    );

    setRound(1);
    setLeadingScore(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreboardContainer}>
        <EliminationHeader />
        {selectedPlayers.map((player) => {
          return (
            <EliminationScoreboardBody
              key={player.name}
              player={player}
              currentPlayer={currentPlayer.id!}
            />
          );
        })}
      </View>
      <CustomButton
        title="Undo"
        buttonStyle={{ width: "25%", alignSelf: "center" }}
        onPressIn={() => onUndo()}
        disabled={!canUndo}
      />
      <EliminationRoundInfo
        currentPlayer={currentPlayer}
        round={round}
        playerScore={playerScore}
      />
      <View>
        <CalculatorButtons
          variant="elimination"
          onHandleSubmit={() => {
            setCurrentState({
              turn,
              round,
              player: JSON.parse(JSON.stringify(currentPlayer)),
              leadingScore,
              nextPlayer: JSON.parse(JSON.stringify(nextPlayer)),
            });
            onHandleSubmit();
          }}
          onDeleteInput={() => onDeleteInput("elimination")}
          setValue={setPlayerScore}
        />
      </View>
    </View>
  );
};

export default Elimination;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
  scoreboardContainer: { flex: 2 },
});
