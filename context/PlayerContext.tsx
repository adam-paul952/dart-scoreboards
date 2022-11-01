import React, { createContext, useContext, useEffect, useState } from "react";

import useSqlite from "../hooks/useSqlite";
import {
  updateOverallPlayerStats,
  updatePlayerStats,
} from "../db-api/stats/stats.controller";

interface PlayerContext {
  playerList: IPlayer[];
  setPlayerList: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  onAddPlayer: (player: IPlayer) => void;
  onDeletePlayer: (id: number) => void;
  selectedPlayers: IPlayer[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  togglePlayerSelect: (id: number) => void;
  overallStats: any[];
  setOverallStats: React.Dispatch<React.SetStateAction<any[]>>;
  baseballStats: any[];
  setBaseballStats: any;
  cricketStats: any[];
  setCricketStats: any;
}

export interface IPlayer {
  id?: number;
  name: string;
  score: number;
  selected: boolean;
  scoreList: Array<number>;
  lives: number;
  killer: boolean;
  stats: IPlayerStats;
}

export interface IPlayerStats {
  gamesWon: number;
  gamesLost: number;
  gamesPlayed: number;
  highScore: number;
  oneDartAverage: number;
  darts: number;
}

export interface OverallStats {
  id: number;
  name: string;
  games_won: number;
  games_lost: number;
  games_played: number;
  one_dart_average: number;
}

const PlayerStateContext = createContext({} as PlayerContext);

const PlayerListProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    createTable,
    getPlayerlist,
    onAddPlayerToDb,
    onDeletePlayerFromDb,
    onGetPlayerStats,
  } = useSqlite();

  const [playerList, setPlayerList] = useState<IPlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);

  const [overallStats, setOverallStats] = useState<OverallStats[]>([]);
  const [baseballStats, setBaseballStats] = useState([]);
  const [cricketStats, setCricketStats] = useState([]);
  const [eliminationStats, setEliminationStats] = useState([]);
  const [killerStats, setKillerStats] = useState([]);
  const [x01Stats, setX01Stats] = useState([]);

  const onAddPlayer = (player: IPlayer) => {
    onAddPlayerToDb(player, setPlayerList);
  };

  const onDeletePlayer = (id: number) => {
    onDeletePlayerFromDb(id, setPlayerList, playerList);
  };

  const togglePlayerSelect = (id: number) => {
    setPlayerList(() =>
      playerList.map((player: IPlayer) => {
        if (player.id === id) {
          player.selected = !player.selected;
        }
        return player;
      })
    );
    setSelectedPlayers(playerList);
  };

  const assignSelectedPlayers = () => {
    setSelectedPlayers(
      playerList.filter((player) => {
        if (player.selected === true) {
          return player;
        }
      })
    );
  };

  useEffect(() => {
    createTable();
    getPlayerlist(setPlayerList);
    onGetPlayerStats(setOverallStats);
    onGetPlayerStats(setBaseballStats, "baseball");
    onGetPlayerStats(setCricketStats, "cricket");
  }, []);

  useEffect(() => {
    assignSelectedPlayers();
  }, [playerList]);

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
    console.log(cricketStats);
    updateStatsArray(cricketStats, updatePlayerStats, "cricket");
  }, [cricketStats]);

  return (
    <PlayerStateContext.Provider
      value={{
        playerList,
        setPlayerList,
        onAddPlayer,
        onDeletePlayer,
        selectedPlayers,
        setSelectedPlayers,
        togglePlayerSelect,
        overallStats,
        setOverallStats,
        baseballStats,
        setBaseballStats,
        cricketStats,
        setCricketStats,
      }}
    >
      {children}
    </PlayerStateContext.Provider>
  );
};

const usePlayerState = () => {
  const context = useContext(PlayerStateContext);
  if (context === undefined) {
    throw new Error("usePlayerState must be used within PlayerStateProvider");
  }
  return context;
};

export { PlayerListProvider, usePlayerState };
