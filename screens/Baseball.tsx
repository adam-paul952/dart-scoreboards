import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useGame from "../hooks/useGame";
import useSqlite from "../hooks/useSqlite";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

import { View } from "../components/Themed";
import BaseballHeader from "@components/scoreboard/header/BaseballHeader";
import BaseballScoreboardBody from "@components/scoreboard/body/BaseballScoreboardBody";
import CalculatorButtons from "@components/scoreboard/calculator-buttons/CalculatorButtons";
import BaseballRoundInfo from "@components/scoreboard/round-info/BaseballRoundInfo";
import gameOverAlert from "@components/GameOverAlert";

const Baseball = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();
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
  } = useGame();
  const { onUpdatePlayerStats } = useSqlite();
  const navigation = useNavigation();

  // set initial player scorelist filled with 0 - mostly for display purposes
  useEffect(() => {
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.map((player) => {
        player.scoreList = new Array(9).fill(0);
        return player;
      })
    );
  }, []);

  // handle score submit
  const onHandleSubmit = () => {
    // convert playerscore to number
    let roundScore = parseInt(playerScore, 10);
    // if score is NaN - score = 0
    if (isNaN(roundScore)) roundScore = 0;
    // assign score to proper index in scorelist
    currentPlayer.scoreList[round - 1] = roundScore;
    // calculate total by reducing scorelist
    const overallScore = currentPlayer.scoreList.reduce((a, b) => a + b);
    assignCurrentPlayerHighScore(currentPlayer);
    changeTurns();
    changeRounds();
    // assign new totals to current player
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        player.score = overallScore;
        player.scoreList = currentPlayer.scoreList;
        return player;
      })
    );
    // if current player score is greater then leading score, set leading score
    currentPlayer.score > leadingScore && setLeadingScore(currentPlayer.score);
    // if round is = 9 and turn is last turn check for duplicates or winner
    if (round === 9 && turn === selectedPlayers.length - 1) {
      const scores: IPlayer[] = selectedPlayers.filter(
        (player: IPlayer) => player.score === leadingScore
      );
      console.log(`scores: `, scores);
      // TODO: if player's have a tie then continue on in game
      if (scores.length > 1) {
        selectedPlayers.forEach((player: IPlayer) => {
          if (playerIsOut.some((value) => value.name === player.name)) return;
          else if (player.score < leadingScore) {
            setPlayerIsOut((prev) => [...prev, player]);
          }
        });
        alert("Extra Innings!");
      } else {
        let winner: { id: number | undefined; name: string } = {
          id: 0,
          name: "",
        };
        // find winner's name
        selectedPlayers.forEach((player: IPlayer) => {
          if (player.score === leadingScore)
            winner = { id: player.id, name: player.name };
        });
        console.log(winner);
        if (winner) {
          selectedPlayers.map((player: IPlayer) => {
            if (player.id === winner.id) {
              // assign winner to baseball and global stats
              player.stats.gamesWon += 1;
              player.stats.gamesPlayed += 1;
              console.log(`Winner stats: `, player.stats);
              onUpdatePlayerStats(player, "baseball");
            } else {
              // assign losing stats
              player.stats.gamesLost += 1;
              player.stats.gamesPlayed += 1;
              console.log(`Losing stats: `, player.stats);
              onUpdatePlayerStats(player, "baseball");
            }
          });
        }
        // alert game over with winner name
        gameOverAlert({
          playerName: winner.name,
          resetGame,
          navigation,
        });
      }
    }
  };

  // reset game if playing again
  const resetGame = () => {
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.map((player) => {
        player.score = 0;
        player.scoreList = new Array(9).fill(0);
        return player;
      })
    );
    setRound(1);
    setLeadingScore(0);
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

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <BaseballHeader />
        <View>
          {selectedPlayers.map((player: IPlayer) => {
            return (
              <Fragment key={player.id}>
                <BaseballScoreboardBody
                  player={player}
                  currentPlayer={currentPlayer.id!}
                />
              </Fragment>
            );
          })}
        </View>
      </View>
      <View>
        <BaseballRoundInfo
          currentPlayer={currentPlayer}
          round={round}
          playerScore={playerScore}
          leadingScore={leadingScore}
        />
        <CalculatorButtons
          variant="baseball"
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={() => onDeleteInput("baseball")}
          setValue={setPlayerScore}
        />
      </View>
    </View>
  );
};

export default Baseball;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
