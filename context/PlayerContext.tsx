import { createContext, useContext, useEffect, useState } from "react";

import {
  createTable,
  getPlayers,
  onnAddPlayerToDb,
  dropTable,
  onDeletePlayerFromDb,
} from "../db-api";

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
  // checkoutPercent: number;
}

const PlayerStateContext = createContext({} as any);

const PlayerListProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerList, setPlayerList] = useState<IPlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>(playerList);

  const onAddPlayer = (player: IPlayer) => {
    // dropTable();
    onnAddPlayerToDb(player, setPlayerList);
  };

  const onDeletePlayer = (id: number) => {
    onDeletePlayerFromDb(id, setPlayerList, playerList);
  };

  useEffect(() => {
    createTable();
    getPlayers(setPlayerList);
  }, []);

  return (
    <PlayerStateContext.Provider
      value={{
        playerList,
        setPlayerList,
        onAddPlayer,
        onDeletePlayer,
        selectedPlayers,
        setSelectedPlayers,
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

/* TODO:
 *  - Replace all occurances of playerlist with selected player list:
 *      - ensures only players selected will be used in a game
 *  - Use Playerlist to store and get information from Async Storage
 *      - that will enable player persistence between app reloads/closures
 *      - that information will be used  only on ManagePlayers screen/Statistics screen
 */
