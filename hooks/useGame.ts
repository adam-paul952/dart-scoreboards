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

  const [gameState, setGameState] = useState({
    turn: 0,
    round: 1,
    currentPlayer: selectedPlayers[0],
    leadingScore: 0,
  });

  // delete input
  const onDeleteInput = (variant?: PlayableGameVariants) => {
    variant === "killer"
      ? setPlayerScore((prev) =>
          prev
            .split("")
            .splice(0, prev.split("").length - 1)
            .toString()
        )
      : variant === "cricket"
      ? setPlayerScore((prev) =>
          prev
            .split(",")
            .splice(0, prev.split(",").length - 1)
            .toString()
        )
      : setPlayerScore("");
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
        )
          player.scoreList = [];

        if (variant === "cricket" || variant === "x01") player.stats.darts = 0;
        if (assignedLives !== undefined) {
          variant === "elimination" && (player.lives = assignedLives);
          variant === "x01" && (player.score = assignedLives);
        }
        if (variant === "killer") {
          player.lives = 0;
          player.killer = false;
        }
        if (variant === "x01") player.stats.oneDartAverage = 0;

        return player;
      })
    );

    setRound(1);
    setLeadingScore(0);
    playerIsOut.length > 0 && setPlayerIsOut(() => []);
  };

  const onChangeTurns = (players: Array<IPlayer>, score: number) => {
    let newTurn = (gameState.turn + 1) % players.length;
    let newScore =
      gameState.leadingScore < score ? score : gameState.leadingScore;
    let newRound = newTurn === 0 ? gameState.round + 1 : gameState.round;

    setGameState({
      ...gameState,
      turn: newTurn,
      round: newRound,
      leadingScore:
        typeof newScore === "string" ? parseInt(newScore, 10) : newScore,
      currentPlayer: { ...players[newTurn] },
    });
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

  const [playerIsOut, setPlayerIsOut] = useState<Array<IPlayer>>([]);

  const nextPlayer =
    selectedPlayers[(gameState.turn + 1) % selectedPlayers.length];

  const limitNumberOfHits = (calculatedHits: Array<number>): void => {
    let hits = calculatedHits.filter((hit) => hit > 0);

    const countOccurances = (scoreArray: string, text: string) =>
      scoreArray.split(text).length - 1;

    let count = countOccurances(playerScore, ",");

    if (
      hits.length > 3 ||
      (hits.length > 0 && hits.reduce((a, b) => a + b) > 9)
    ) {
      setPlayerScore(
        playerScore.slice(0, playerScore.indexOf(",") + 3 * (count - 1))
      );
    }
  };

  // calculate hits for button display
  const calculateHits = (
    array: Array<string | number>,
    targets: Array<string | number>
  ) =>
    targets.map(
      (target) =>
        array.filter((hitNum) =>
          typeof hitNum === "string"
            ? hitNum === target.toString()
            : hitNum === target
        ).length
    );

  const skipPlayer = () => {
    changeTurns();
    changeRounds();
  };

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
    limitNumberOfHits,
    calculateHits,
    gameState,
    setGameState,
    onChangeTurns,
    skipPlayer,
  };
};

export default useGame;
