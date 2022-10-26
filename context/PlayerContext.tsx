import { createContext, useContext, useEffect, useState } from "react";

import useSqlite from "../hooks/useSqlite";

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
  winPercent: number;
}

const PlayerStateContext = createContext({} as any);

const PlayerListProvider = ({ children }: { children: React.ReactNode }) => {
  const { createTable, getPlayers, onAddPlayerToDb, onDeletePlayerFromDb } =
    useSqlite();

  const [playerList, setPlayerList] = useState<IPlayer[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);

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

  useEffect(() => {
    createTable();
    getPlayers(setPlayerList);
  }, []);

  useEffect(() => {
    const assignSelectedPlayers = () => {
      setSelectedPlayers(
        playerList.filter((player) => {
          if (player.selected === true) {
            return player;
          }
        })
      );
    };

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

/* TODO:
 *  - Replace all occurances of playerlist with selected player list:
 *      - ensures only players selected will be used in a game
 *  - Use Playerlist to store and get information from Async Storage
 *      - that will enable player persistence between app reloads/closures
 *      - that information will be used  only on ManagePlayers screen/Statistics screen
 */
