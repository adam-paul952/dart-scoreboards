import React, { useState } from "react";
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

  const onDeleteInput = () => {
    setPlayerScore((prev: string) => prev.slice(-1));
  };

  const onHandleSubmit = () => {
    // convert string array into numbers and push into current player scoreList
    playerScore
      .split(",")
      .forEach((score) => currentPlayer.scoreList.push(parseInt(score, 10)));
    console.log(currentPlayer.scoreList);
    // change turns
    changeTurns();
    // set player state with updated values
    setPlayerList((prev: IPlayer[]) =>
      prev.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        else return player;
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
        <View>
          {playerList.map((player: IPlayer) => {
            return (
              <CricketScoreboardBody
                key={player.id}
                player={player}
                currentPlayer={currentPlayer}
              />
            );
          })}
        </View>
      </View>
      <View>
        <CricketRoundInfo currentPlayer={currentPlayer} />
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
