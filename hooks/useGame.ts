import { useState } from "react";

import { usePlayerState, IPlayer } from "@context/PlayerContext";

import { GameVariants } from "types";

export type PlayableGameVariants = Exclude<GameVariants, "overall">;

const useGame = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();

  // input score
  const [playerScore, setPlayerScore] = useState<string>("");

  // leading score
  const [leadingScore, setLeadingScore] = useState<number>(0);

  // delete input
  const onDeleteInput = (variant: PlayableGameVariants) => {
    if (variant === "killer")
      setPlayerScore((prev) =>
        prev
          .split("")
          .splice(0, prev.split("").length - 1)
          .toString()
      );
    else if (variant === "cricket")
      setPlayerScore((prev) =>
        prev
          .split(",")
          .splice(0, prev.split(",").length - 1)
          .toString()
      );
    else setPlayerScore("");
  };

  // reset game if playing again
  const onResetGame = (
    variant: PlayableGameVariants,
    assignedLives?: number
  ) => {
    setSelectedPlayers((prev) =>
      prev.map((player) => {
        player.score = 0;
        player.stats.highScore = 0;
        if (variant === "baseball") player.scoreList = new Array(10).fill(0);
        if (
          variant === "cricket" ||
          variant === "elimination" ||
          variant === "x01"
        ) {
          player.scoreList = [];
        }
        if (variant === "cricket" || variant === "x01") player.stats.darts = 0;
        if (assignedLives !== undefined) {
          variant === "elimination" && (player.lives = assignedLives);
          variant === "x01" && (player.score = assignedLives);
        }
        if (variant === "killer") {
          player.lives = 0;
          player.killer = false;
        }
        if (variant === "x01") {
          player.stats.oneDartAverage = 0;
        }
        return player;
      })
    );

    setRound(1);
    setLeadingScore(0);
    playerIsOut.length > 0 && setPlayerIsOut(() => []);
  };

  // turn information
  const [turn, setTurn] = useState<number>(0);

  // change turns
  const changeTurns = () => {
    setTurn((prev) => (prev + 1) % selectedPlayers.length);
    setCurrentPlayer(
      () => selectedPlayers[(turn + 1) % selectedPlayers.length]
    );
  };

  // round information
  const [round, setRound] = useState<number>(1);

  // change rounds
  const changeRounds = () =>
    turn === selectedPlayers.length - 1 ? setRound((prev) => prev + 1) : null;

  // current player
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(
    selectedPlayers[turn]
  );

  // calculate current player highscore
  const assignCurrentPlayerHighScore = (player: IPlayer) => {
    player.scoreList.forEach((score: number) => {
      if (player.stats.highScore < score) player.stats.highScore = score;
    });
  };

  const [playerIsOut, setPlayerIsOut] = useState<any[]>([]);

  const nextPlayer = selectedPlayers[(turn + 1) % selectedPlayers.length];

  return {
    playerScore,
    setPlayerScore,
    leadingScore,
    setLeadingScore,
    onDeleteInput,
    turn,
    setTurn,
    changeTurns,
    currentPlayer,
    setCurrentPlayer,
    round,
    setRound,
    changeRounds,
    assignCurrentPlayerHighScore,
    playerIsOut,
    setPlayerIsOut,
    nextPlayer,
    onResetGame,
  };
};

export default useGame;
