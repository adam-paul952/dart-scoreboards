import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import useGame from "../hooks/useGame";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

import { View } from "../components/Themed";
import EliminationHeader from "@components/scoreboard/header/EliminationHeader";
import EliminationScoreboardBody from "@components/scoreboard/body/EliminationScoreboardBody";
import EliminationRoundInfo from "@components/scoreboard/round-info/EliminationRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

import gameOverAlert from "@components/GameOverAlert";

const Elimination = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
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
    getCurrentPlayerHighScore,
  } = useGame();
  const navigation = useNavigation();

  // set variables
  let winner = "";
  let roundScore = 0;
  const [eliminationLives] = useState(currentPlayer.lives);

  // check to see if current player lives === 0 - player is out, pass turn
  useEffect(() => {
    if (currentPlayer.lives === 0) {
      changeTurns();
      changeRounds();
    }
  }, [currentPlayer]);

  const onHandleSubmit = () => {
    // convert playerScore to number
    roundScore = parseInt(playerScore, 10);
    // if playerScore isn't a number -> score = 0
    if (isNaN(roundScore)) roundScore = 0;
    // assign score to scorelist
    currentPlayer.scoreList.push(roundScore);
    getCurrentPlayerHighScore();
    // if it's the first turn of the game and the player doesn't score - player doesn't lose a life
    if (round === 1 && turn === 0 && roundScore === 0) {
      setSelectedPlayers((prev: IPlayer[]) =>
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
      setSelectedPlayers((prev: IPlayer[]) =>
        prev.map((player) => {
          if (player.id === currentPlayer.id) {
            player.score = roundScore;
            return player;
          } else return player;
        })
      );
    } else {
      setLeadingScore(roundScore);
      setSelectedPlayers((prev: IPlayer[]) =>
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
      (player: IPlayer) => player.lives > 0
    ).length;
    if (checkForWinningPlayer === 1) {
      selectedPlayers.forEach((player: IPlayer) => {
        if (player.lives > 0) winner = player.name;
      });
      // alert game over with winner name
      gameOverAlert({
        playerName: winner,
        resetGame,
        navigation,
      });
    }
  };

  // reset game if playing again
  const resetGame = () => {
    setSelectedPlayers((prev: IPlayer[]) =>
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
    // Main Container
    <View style={styles.container}>
      {/* scoreboard container */}
      <View style={styles.scoreboardContainer}>
        {/* scoreboard header */}
        <EliminationHeader />
        {/* scoreboard body */}
        {selectedPlayers.map((player: IPlayer) => {
          return (
            <EliminationScoreboardBody
              key={player.name}
              player={player}
              currentPlayer={currentPlayer.id}
            />
          );
        })}
      </View>
      {/* end scoreboard container */}
      {/* round info */}
      <EliminationRoundInfo
        currentPlayer={currentPlayer}
        round={round}
        playerScore={playerScore}
      />
      {/* end round info */}
      {/* calculator buttons container */}
      <View>
        <CalculatorButtons
          variant="elimination"
          onHandleSubmit={() => onHandleSubmit()}
          onDeleteInput={() => onDeleteInput("elimination")}
          setValue={setPlayerScore}
        />
      </View>
      {/* end calculator buttons container */}
    </View>
    // end main container
  );
};

export default Elimination;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
  scoreboardContainer: { flex: 2 },
});
