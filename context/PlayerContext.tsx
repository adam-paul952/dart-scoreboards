import { createContext, useContext, useState } from "react";

export interface IPlayer {
  id: number;
  name: string;
  score: number;
  selected: boolean;
  scoreList: Array<number>;
  lives: number;
  stats: IPlayerStats;
}

export interface IPlayerStats {
  highScore: number;
  oneDartAverage: number;
  darts: number;
  // checkoutPercent: number;
}

// const players = [
//   {
//     id: 1,
//     name: "Adam",
//     score: 0,
//     selected: true,
//     scoreList: [],
//     lives: 0,
//     stats: {
//       highScore: 0,
//       oneDartAverage: 0,
//       darts: 0,
//       // checkoutPercent: 0,
//     },
//   },
//   {
//     id: 2,
//     name: "Paul",
//     score: 0,
//     selected: true,
//     scoreList: [],
//     lives: 0,
//     stats: {
//       highScore: 0,
//       oneDartAverage: 0,
//       darts: 0,
//       // checkoutPercent: 0,
//     },
//   },
// ];

const PlayerStateContext = createContext({} as any);

const PlayerListProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerList, setPlayerList] = useState<IPlayer[]>([]);

  const onAddPlayer = (player: IPlayer) => {
    setPlayerList([...playerList, player]);
  };

  const onDeletePlayer = (id: number) => {
    setPlayerList(() =>
      playerList.filter((player: IPlayer) => player.id !== id)
    );
  };

  return (
    <PlayerStateContext.Provider
      value={{ playerList, setPlayerList, onAddPlayer, onDeletePlayer }}
    >
      {children}
    </PlayerStateContext.Provider>
  );
};

const usePlayerState = () => {
  const context = useContext(PlayerStateContext);
  if (context === undefined) {
    throw new Error("usePlayerState must be used within PlayerStateProvideo");
  }
  return context;
};

export { PlayerListProvider, usePlayerState };
