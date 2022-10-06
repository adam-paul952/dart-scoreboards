import { usePlayerState, IPlayer } from "@context/PlayerContext";
import React, { useState } from "react";

const useGame = () => {
  const { playerList } = usePlayerState();

  // input score
  const [playerScore, setPlayerScore] = useState<string>("");

  // leading score
  const [leadingScore, setLeadingScore] = useState<number>(0);

  // delete input
  const onDeleteInput = () => {
    setPlayerScore("");
  };

  // turn information
  const [turn, setTurn] = useState<number>(0);

  // change turns
  const changeTurns = () => {
    setTurn((prev) => (prev + 1) % playerList.length);
    setCurrentPlayer(playerList[(turn + 1) % playerList.length]);
  };

  // round information
  const [round, setRound] = useState<number>(1);

  // change rounds
  const changeRounds = () => {
    turn === playerList.length - 1 && setRound((prev) => prev + 1);
  };

  // current player
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(playerList[turn]);

  // calculate current player highscore
  const getCurrentPlayerHighScore = () => {
    currentPlayer.scoreList.forEach((score: number) => {
      if (currentPlayer.stats.highScore < score)
        currentPlayer.stats.highScore = score;
    });
  };

  return {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    onDeleteInput,
    turn,
    changeTurns,
    currentPlayer,
    round,
    setRound,
    changeRounds,
    getCurrentPlayerHighScore,
  };
};

export default useGame;
