import React, { createContext, useContext, useEffect, useState } from "react";

import useSqlite from "../hooks/useSqlite";

interface PlayerContext {
  playerList: IPlayer[];
  setPlayerList: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  onAddPlayer: (player: IPlayer) => void;
  onDeletePlayer: (id: number) => void;
  selectedPlayers: IPlayer[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  togglePlayerSelect: (id: number) => void;
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
  highScore: number;
  oneDartAverage: number;
  darts: number;
}

const PlayerStateContext = createContext({} as PlayerContext);

const PlayerListProvider = ({ children }: { children: React.ReactNode }) => {
  const { createTable, getPlayerlist, onAddPlayerToDb, onDeletePlayerFromDb } =
    useSqlite();

  const [playerList, setPlayerList] = useState<IPlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    createTable();
    getPlayerlist(setPlayerList);
  }, []);

  const onAddPlayer = (player: IPlayer) => {
    onAddPlayerToDb(player, setPlayerList);
  };

  const onDeletePlayer = (id: number) => {
    onDeletePlayerFromDb(id, setPlayerList, playerList);
  };

  const togglePlayerSelect = (id: number) => {
    setPlayerList(() =>
      playerList.map((player) => {
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
    assignSelectedPlayers();
  }, [playerList]);

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
