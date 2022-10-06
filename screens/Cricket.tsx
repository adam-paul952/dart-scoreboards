import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { IPlayer, usePlayerState } from "../context/PlayerContext";
import useGame from "../hooks/useGame";
import { View } from "../components/Themed";

import CricketHeader from "@scoreboard/header/CricketHeader";
import CricketScoreboardBody from "@scoreboard/body/CricketScoreboardBody";
import CricketRoundInfo from "@scoreboard/round-info/CricketRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";
import gameOverAlert from "@components/GameOverAlert";
import { useNavigation } from "@react-navigation/native";

const targets = [20, 19, 18, 17, 16, 15, 25];

const Cricket = () => {
  const { playerList, setPlayerList } = usePlayerState();
  const {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    changeTurns,
    round,
    setRound,
    changeRounds,
    currentPlayer,
  } = useGame();
  const navigation = useNavigation();

  // disabled state for calculator buttons
  const [disableButton, setDisableButton] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // remove last element from playerScore
  const onDeleteInput = () => {
    setPlayerScore((prev) =>
      prev
        .split(",")
        .splice(0, prev.split(",").length - 1)
        .toString()
    );
  };

  const onHandleSubmit = () => {
    // convert string array into numbers and push into current player scoreList
    playerScore.split(",").forEach((score) => {
      const newScore = parseInt(score, 10);
      !isNaN(newScore) && currentPlayer.scoreList.push(newScore);
    });
    // calculate score
    const newScore = handleScoreChange(currentPlayer.scoreList);
    // determine if player has highest score
    newScore > leadingScore && setLeadingScore(newScore);
    // set player state with updated values
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        else {
          player.scoreList = currentPlayer.scoreList;
          player.score = newScore;
          return player;
        }
      })
    );
    // check current player array for maximum marks
    const declareWinner = targets
      .map((target) => {
        return currentPlayer.scoreList.filter((num) => num === target).length;
      })
      .every((hit) => hit >= 3);
    // if player has all marks and leading score
    if (declareWinner && currentPlayer.score >= leadingScore) {
      // alert game over
      gameOverAlert({ playerName: currentPlayer.name, resetGame, navigation });
      // else change turns and rounds
    } else {
      // change turns
      changeTurns();
      // changeRounds
      changeRounds();
    }
  };

  // reset game
  const resetGame = () => {
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        player.score = 0;
        player.scoreList = [];
        return player;
      })
    );
    setDisableButton((prev) =>
      prev.map((value) => {
        return (value = false);
      })
    );
    setLeadingScore(0);
    setRound(1);
  };

  // if player has more then three marks on a number assign score
  const handleScoreChange = (playerArray: Array<number>) => {
    let newScore = [];
    for (let i = 0; i < targets.length; i++) {
      let countedScore = playerArray.filter((hitNum) => hitNum === targets[i]);
      countedScore.splice(0, 3);
      newScore.push(countedScore.reduce((a, b) => a + b, 0));
    }
    return newScore.reduce((a, b) => a + b, 0);
  };

  // disable buttons if all players have number closed
  const disableInputButtons = () => {
    // loop over target array
    for (let i = 0; i < targets.length; i++) {
      // map over playerList
      let checkNumOfMarks = playerList.map((player: IPlayer) => {
        // if player.id is equal to currentPlayer
        if (player.id === currentPlayer.id) {
          // make shallow copy of scorelist
          let hitArray = [...player.scoreList];
          // convert current marks to array and push into copy of player scorelist
          playerScore
            .split(",")
            .forEach(
              (num) =>
                !isNaN(parseInt(num, 10)) && hitArray.push(parseInt(num, 10))
            );
          // filter updated scorelist copy to determine if number should be closed
          return hitArray.filter((hitNum) => hitNum === targets[i]).length;
        }
        // if player is not current player then no need to update or copy playerlist - marks are set
        return player.scoreList.filter((hitNum) => hitNum === targets[i])
          .length;
      });
      // for each target we check against current marks
      const markClosed = checkNumOfMarks.every((num: number) => num >= 3);
      // if the marks are closed
      if (markClosed) {
        setDisableButton((prev) =>
          prev.map((value, index) => {
            // if the index is equal to the index in targets we set mark disabled
            if (index === i) return (value = true);
            // or just return the value
            else return value;
          })
        );
      }
    }
  };

  useEffect(() => {
    disableInputButtons();
  }, [playerScore, playerList]);

  // calculate hits for button display
  const calculateHits = (array: Array<string>) => [
    array.filter((hitNum) => hitNum === "20").length,
    array.filter((hitNum) => hitNum === "19").length,
    array.filter((hitNum) => hitNum === "18").length,
    array.filter((hitNum) => hitNum === "17").length,
    array.filter((hitNum) => hitNum === "16").length,
    array.filter((hitNum) => hitNum === "15").length,
    array.filter((hitNum) => hitNum === "25").length,
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <CricketHeader />
        <>
          {playerList.map((player: IPlayer) => {
            return (
              <CricketScoreboardBody
                key={player.id}
                player={player}
                currentPlayer={currentPlayer}
              />
            );
          })}
        </>
      </View>
      <View>
        <CricketRoundInfo
          currentPlayer={currentPlayer}
          round={round}
          leadingScore={leadingScore}
          marks={calculateHits(playerScore.split(","))}
        />
        <CalculatorButtons
          variant="cricket"
          value={playerScore}
          setValue={setPlayerScore}
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={onDeleteInput}
          hitTargets={calculateHits(playerScore.split(","))}
          disabled={disableButton}
        />
      </View>
    </View>
  );
};

export default Cricket;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
});

/* TODO:
 * - Players should not to be able to score any more then 9 marks per round
 * - Round Info:
 *   - Marks per round
 *   - Points per round
 *   - Total Marks
 *   - Turn Points display
 * - Styling for all components
 * - Probably should look at the functions to see if can be refactored or reused - there is a lot of manipulating arrays
 */
