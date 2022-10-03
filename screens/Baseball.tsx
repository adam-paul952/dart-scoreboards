import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useGame from "../hooks/useGame";
import { IPlayer, usePlayerState } from "../context/PlayerContext";
import { View } from "../components/Themed";
import BaseballHeader from "@components/scoreboard/header/BaseballHeader";

import BaseballScoreboardBody from "@components/scoreboard/body/BaseballScoreboardBody";
import CalculatorButtons from "@components/scoreboard/calculator-buttons/CalculatorButtons";
import BaseballRoundInfo from "@components/scoreboard/round-info/BaseballRoundInfo";
import gameOverAlert from "@components/GameOverAlert";

const Baseball = () => {
  const { playerList, setPlayerList } = usePlayerState();
  const {
    turn,
    changeTurns,
    round,
    setRound,
    changeRounds,
    currentPlayer,
    getCurrentPlayerHighScore,
  } = useGame();
  const navigation = useNavigation();
  // set initial player scorelist filled with 0 - mostly for display purposes
  useEffect(() => {
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        player.scoreList = new Array(9).fill(0);
        return player;
      })
    );
  }, []);

  // input score
  const [playerScore, setPlayerScore] = useState<string>("");
  // leading score
  const [leadingScore, setLeadingScore] = useState<number>(0);

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
    onUpDateStats();
    changeTurns();
    changeRounds();
    // assign new totals to current player
    setPlayerList((prev: IPlayer[]) =>
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
    if (round === 9 && turn === playerList.length - 1) {
      const scores = playerList.map((player: IPlayer) => {
        return { name: player.score, score: player.score };
      });
      // find duplicates in high score to determine if game is over
      const duplicates = scores.some(
        (item: any, index: number) => scores.indexOf(item) !== index
      );
      // TODO: if player's have a tie then continue on in game
      if (duplicates) {
        alert("Extra Innings!");
      } else {
        let winner: string = "";
        // find winner's name
        playerList.forEach((player: IPlayer) => {
          if (player.score === leadingScore) winner = player.name;
        });
        // alert game over with winner name
        gameOverAlert({
          playerName: winner,
          resetGame,
          navigation,
        });
      }
    }
  };
  // update player stats
  const onUpDateStats = () => {
    getCurrentPlayerHighScore();
  };

  // delete input
  const onDeleteInput = () => {
    setPlayerScore("");
  };

  // reset game if playing again
  const resetGame = () => {
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        player.score = 0;
        player.scoreList = new Array(9).fill(0);
        return player;
      })
    );
    setRound(1);
    setLeadingScore(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <BaseballHeader />
        <View>
          {playerList.map((player: IPlayer) => {
            return (
              <React.Fragment key={player.id}>
                <BaseballScoreboardBody
                  player={player}
                  currentPlayer={currentPlayer.id}
                />
              </React.Fragment>
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
          onDeleteInput={onDeleteInput}
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
