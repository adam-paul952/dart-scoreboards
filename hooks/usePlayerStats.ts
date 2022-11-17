import { useEffect, useState } from "react";

import {
  updatePlayerStats,
  getPlayerStats,
} from "../db-api/stats/stats.controller";

import useSqlite from "../hooks/useSqlite";
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
  // const { onGetPlayerStats } = useSqlite();

  const [overallStats, setOverallStats] = useState<OverallStats[]>([]);
  const [baseballStats, setBaseballStats] = useState<GameStats[]>([]);
  const [cricketStats, setCricketStats] = useState<GameStats[]>([]);
  const [eliminationStats, setEliminationStats] = useState<GameStats[]>([]);
  const [killerStats, setKillerStats] = useState<GameStats[]>([]);
  const [x01Stats, setX01Stats] = useState<X01Stats[]>([]);

  // assign stats for all games to state
  const onGetAllStats = () => {
    // onGetPlayerStats(setOverallStats, "overall");
    // getPlayerStats(setBaseballStats, "baseball");
    getPlayerStats(setCricketStats, "cricket");
    // onGetPlayerStats(setEliminationStats, "elimination");
    // onGetPlayerStats(setKillerStats, "killer");
    // onGetPlayerStats(setX01Stats, "x01");
  };

  useEffect(() => {
    onGetAllStats();
  }, []);

  const updateStatsArray = (
    array: (OverallStats | GameStats | X01Stats)[],
    stateSetter: (
      game: GameVariants,
      statsToUpdate: (string | number | null)[]
    ) => void,
    game: GameVariants
  ) => {
    for (let i = 0; i < array.length; i++) {
      let newArray: (string | number | null)[] = [];

      for (const [key, value] of Object.entries(array[i])) {
        if (key !== "name" && key !== "one_dart_average") newArray.push(value);
        // return newArray;
      }

      stateSetter(game, newArray);
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

    updateStatsArray(overallStats, updatePlayerStats, "overall");

    onUpdateGameStats(game, player, winner);
  };

  const onUpdateGameStats = (
    game: GameVariants,
    player: IPlayer,
    winner: { id?: number; name: string } | IPlayer
  ) => {
    switch (game) {
      case "baseball":
        updateStatsArray(baseballStats, updatePlayerStats, game);
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

        updateStatsArray(cricketStats, updatePlayerStats, game);
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
        console.log(`Elimination Updated`);
        updateStatsArray(eliminationStats, updatePlayerStats, game);
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
        console.log(`Killer Updated`);
        updateStatsArray(killerStats, updatePlayerStats, game);
        break;

      case "x01":
        updateStatsArray(x01Stats, updatePlayerStats, game);
        break;

      default:
        return null;
    }
  };

  useEffect(() => {
    console.log(`Overall: `);
    console.log(overallStats);
  }, [overallStats]);
  useEffect(() => {
    console.log(`Baseball: `);
    console.log(baseballStats);
  }, [baseballStats]);
  useEffect(() => {
    console.log(`Cricket: `);
    console.log(cricketStats);
  }, [cricketStats]);
  useEffect(() => {
    console.log(`Killer: `);
    console.log(killerStats);
  }, [killerStats]);
  useEffect(() => {
    console.log(`Elimination: `);
    console.log(eliminationStats);
  }, [eliminationStats]);
  useEffect(() => {
    console.log(`X01: `);
    console.log(x01Stats);
  }, [x01Stats]);

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
  };
};

export default usePlayerStats;
