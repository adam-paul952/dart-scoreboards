import { usePlayerState, IPlayer } from "@context/PlayerContext";
import { useState } from "react";

const useGame = () => {
  const { selectedPlayers, setSelectedPlayers } = usePlayerState();

  // input score
  const [playerScore, setPlayerScore] = useState<string>("");

  // leading score
  const [leadingScore, setLeadingScore] = useState<number>(0);

  // delete input
  const onDeleteInput = (variant: string) => {
    if (variant === "killer")
      setPlayerScore((prev) =>
        prev
          .split("")
          .splice(0, prev.split("").length - 1)
          .toString()
      );
    else setPlayerScore("");
  };

  // turn information
  const [turn, setTurn] = useState<number>(0);

  // change turns
  const changeTurns = () => {
    setTurn((prev) => (prev + 1) % selectedPlayers.length);
    setCurrentPlayer(selectedPlayers[(turn + 1) % selectedPlayers.length]);
  };

  // round information
  const [round, setRound] = useState<number>(1);

  // change rounds
  const changeRounds = () => {
    turn === selectedPlayers.length - 1 && setRound((prev) => prev + 1);
  };

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
  };
};

export default useGame;
