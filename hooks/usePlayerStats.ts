import { useEffect, useState } from "react";

import {
  updatePlayerStats,
  getPlayerStats,
  createTables,
  dropTables,
} from "../db-api/stats/stats.controller";

import { GameVariants } from "../types";
import { IPlayer } from "@context/PlayerContext";

export interface OverallStats {
  id: number;
  name: string;
  games_won: number;
  games_lost: number;
  games_played: number;
}

export interface GameStats extends OverallStats {
  highscore: number;
}

export interface X01Stats extends GameStats {
  one_dart_average: number;
}

const usePlayerStats = () => {
  const [isGameOver, setGameOver] = useState<{
    isOver: boolean;
    game: GameVariants;
  }>({ isOver: false, game: "overall" });

  const [overallStats, setOverallStats] = useState<OverallStats[]>([]);
  const [baseballStats, setBaseballStats] = useState<GameStats[]>([]);
  const [cricketStats, setCricketStats] = useState<GameStats[]>([]);
  const [eliminationStats, setEliminationStats] = useState<GameStats[]>([]);
  const [killerStats, setKillerStats] = useState<GameStats[]>([]);
  const [x01Stats, setX01Stats] = useState<X01Stats[]>([]);

  // assign stats for all games to state
  const onGetAllStats = () => {
    getPlayerStats(setOverallStats, "overall");
    getPlayerStats(setBaseballStats, "baseball");
    getPlayerStats(setCricketStats, "cricket");
    getPlayerStats(setEliminationStats, "elimination");
    getPlayerStats(setKillerStats, "killer");
    getPlayerStats(setX01Stats, "x01");
  };

  useEffect(() => {
    onGetAllStats();
  }, []);

  const onCreateStats = () => createTables();

  const onFormatStatsArray = (
    array: (OverallStats | GameStats | X01Stats)[],
    game: GameVariants
  ) => {
    for (let i = 0; i < array.length; i++) {
      let newArray: (string | number | null)[] = [];

      for (const [key, value] of Object.entries(array[i])) {
        if (key !== "name" && key !== "one_dart_average") newArray.push(value);
      }

      updatePlayerStats(game, newArray);
    }
  };

  const onUpdatePlayerStats = (
    game: GameVariants,
    player: IPlayer,
    winner: { id?: number; name: string } | IPlayer
  ) => {
    setOverallStats((prev) =>
      prev.map((item) => {
        if (item.id === player.id && item.id !== winner.id) {
          item.games_played += 1;
          item.games_lost += 1;
          // console.log(`Losing Stats: `, player.stats);
        } else if (item.id === player.id && item.id === winner.id) {
          item.games_won += 1;
          item.games_played += 1;
          // console.log(`Winner stats: `, player.stats);
        }
        return item;
      })
    );

    onUpdateGameStats(game, player, winner);
  };

  const assignStatsToDB = (game: GameVariants) => {
    onFormatStatsArray(overallStats, "overall");

    switch (game) {
      case "baseball":
        onFormatStatsArray(baseballStats, game);
        break;

      case "cricket":
        onFormatStatsArray(cricketStats, game);
        break;

      case "elimination":
        onFormatStatsArray(eliminationStats, game);
        break;

      case "killer":
        onFormatStatsArray(killerStats, game);
        break;

      case "x01":
        onFormatStatsArray(x01Stats, game);
        break;

      default:
        return;
    }
  };

  const onUpdateGameStats = (
    game: GameVariants,
    player: IPlayer,
    winner: { id?: number; name: string } | IPlayer
  ) => {
    switch (game) {
      case "baseball":
        setBaseballStats((prev) =>
          prev.map((item) => {
            if (item.id === player.id && item.id !== winner.id) {
              item.games_played += 1;
              item.games_lost += 1;
            } else if (item.id === player.id && item.id === winner.id) {
              item.games_won += 1;
              item.games_played += 1;
            }
            return item;
          })
        );
        break;

      case "cricket":
        setCricketStats((prev) =>
          prev.map((item) => {
            if (item.id === player.id && item.id !== winner.id) {
              item.games_played += 1;
              item.games_lost += 1;
            } else if (item.id === player.id && item.id === winner.id) {
              item.games_won += 1;
              item.games_played += 1;
            }
            return item;
          })
        );
        break;

      case "elimination":
        setEliminationStats((prev) =>
          prev.map((item) => {
            if (item.id === player.id && item.id !== winner.id) {
              item.games_played += 1;
              item.games_lost += 1;
              // console.log(`Losing Stats: `, player.stats);
            } else if (item.id === player.id && item.id === winner.id) {
              item.games_won += 1;
              item.games_played += 1;
              // console.log(`Winner stats: `, player.stats);
            }
            return item;
          })
        );
        break;

      case "killer":
        setKillerStats((prev) =>
          prev.map((item) => {
            if (item.id === player.id && item.id !== winner.id) {
              item.games_played += 1;
              item.games_lost += 1;
            } else if (item.id === player.id && item.id === winner.id) {
              item.games_played += 1;
              item.games_won += 1;
            }
            return item;
          })
        );
        break;

      case "x01":
        setX01Stats((prev: any) =>
          prev.map((item: any) => {
            if (item.id === player.id && item.id !== winner.id) {
              item.games_played += 1;
              item.games_lost += 1;
            } else if (item.id === player.id && item.id === winner.id) {
              item.games_played += 1;
              item.games_won += 1;
            }
            return item;
          })
        );
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    if (isGameOver.isOver) assignStatsToDB(isGameOver.game);
  }, [isGameOver]);

  const calculateWinPercent = (
    gamesWon: number,
    gamesPlayed: number
  ): number => {
    let score = (gamesWon / gamesPlayed) * 100;
    if (isNaN(score)) return 0;
    else return score;
  };

  const onDropPlayerStats = () => dropTables();

  return {
    overallStats,
    setOverallStats,
    baseballStats,
    setBaseballStats,
    cricketStats,
    setCricketStats,
    eliminationStats,
    setEliminationStats,
    killerStats,
    setKillerStats,
    x01Stats,
    setX01Stats,
    onUpdatePlayerStats,
    setGameOver,
    onGetAllStats,
    calculateWinPercent,
    onCreateStats,
    onDropPlayerStats,
  };
};

export default usePlayerStats;
