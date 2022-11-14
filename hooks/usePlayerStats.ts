import { useEffect, useState } from "react";

import {
  updateOverallPlayerStats,
  updatePlayerStats,
} from "../db-api/stats/stats.controller";

import useSqlite from "../hooks/useSqlite";

export interface OverallStats {
  id: number;
  name: string;
  games_won: number;
  games_lost: number;
  games_played: number;
  one_dart_average: number;
}

const usePlayerStats = () => {
  const { onGetPlayerStats } = useSqlite();

  const [overallStats, setOverallStats] = useState<OverallStats[]>([]);
  const [baseballStats, setBaseballStats] = useState([]);
  const [cricketStats, setCricketStats] = useState([]);
  const [eliminationStats, setEliminationStats] = useState([]);
  const [killerStats, setKillerStats] = useState([]);
  const [x01Stats, setX01Stats] = useState([]);

  useEffect(() => {
    onGetPlayerStats(setOverallStats);
    onGetPlayerStats(setBaseballStats, "baseball");
    onGetPlayerStats(setCricketStats, "cricket");
    onGetPlayerStats(setEliminationStats, "elimination");
    onGetPlayerStats(setKillerStats, "killer");
    onGetPlayerStats(setX01Stats, "x01");
  }, []);

  const updateStatsArray = (array: any[], stateSetter: any, game?: any) => {
    for (let i = 0; i < array.length; i++) {
      let newArray: any[] = [];

      for (const [key, value] of Object.entries(array[i])) {
        if (key !== "name" && key !== "one_dart_average") newArray.push(value);
      }
      if (game !== undefined) stateSetter(game, newArray);
      else stateSetter(newArray);
      newArray = [];
    }
  };

  useEffect(() => {
    // console.log(overallStats);
    updateStatsArray(overallStats, updateOverallPlayerStats);
  }, [overallStats]);

  useEffect(() => {
    // console.log(baseballStats);
    updateStatsArray(baseballStats, updatePlayerStats, "baseball");
  }, [baseballStats]);

  useEffect(() => {
    // console.log(cricketStats);
    updateStatsArray(cricketStats, updatePlayerStats, "cricket");
  }, [cricketStats]);

  useEffect(() => {
    // console.log(eliminationStats);
    updateStatsArray(eliminationStats, updatePlayerStats, "elimination");
  }, [eliminationStats]);

  useEffect(() => {
    // console.log(killerStats);
    updateStatsArray(killerStats, updatePlayerStats, "killer");
  }, [killerStats]);

  useEffect(() => {
    // console.log(x01Stats);
    updateStatsArray(x01Stats, updatePlayerStats, "x01");
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
  };
};

export default usePlayerStats;
