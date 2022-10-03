import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { IPlayer, usePlayerState } from "../context/PlayerContext";
import useGame from "../hooks/useGame";
import { View } from "../components/Themed";

import CricketHeader from "@scoreboard/header/CricketHeader";
import CricketScoreboardBody from "@scoreboard/body/CricketScoreboardBody";
import CricketRoundInfo from "@scoreboard/round-info/CricketRoundInfo";
import CalculatorButtons from "@scoreboard/calculator-buttons/CalculatorButtons";

const Cricket = () => {
  const { playerList, setPlayerList } = usePlayerState();
  const { changeTurns, round, changeRounds, currentPlayer } = useGame();

  // player score state
  const [playerScore, setPlayerScore] = useState<string>("");

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
    console.log(currentPlayer.scoreList);
    // change turns
    changeTurns();
    // set player state with updated values
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        else {
          player.scoreList = currentPlayer.scoreList;
          return player;
        }
      })
    );
  };

  const handleScoreChange = () => {};

  React.useEffect(() => {
    console.log(`PlayerScore: ${playerScore}`);
  }, [playerScore]);

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
                // hitTargets={hitTargets}
              />
            );
          })}
        </>
      </View>
      <View>
        <CricketRoundInfo currentPlayer={currentPlayer} round={round} />
        <CalculatorButtons
          variant="cricket"
          value={playerScore}
          setValue={setPlayerScore}
          onHandleSubmit={onHandleSubmit}
          onDeleteInput={onDeleteInput}
        />
      </View>
    </View>
  );
};

export default Cricket;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
});
