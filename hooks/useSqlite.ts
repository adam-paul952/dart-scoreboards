import * as playerlist from "../db-api/playerlist/playerlist.controller";
import * as stats from "../db-api/stats/stats.controller";
import * as resumeGame from "../db-api/resumeGame/resumeGame.controller";

import { IPlayer } from "@context/PlayerContext";
import { X01Stats } from "../screens/Statistics";

type UpdateSelectedPlayerArgs = {
  selected: number;
  id: number;
};

const useSqlite = () => {
  // CREATE
  const createTable = () => {
    playerlist.createTable();
    stats.createTables();
    resumeGame.createTable();
  };

  // READ
  const getPlayerlist = (
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => playerlist.getPlayers(setPlayersFunc);

  const onGetPlayerStats = (
    statsArray: React.Dispatch<React.SetStateAction<X01Stats[]>>,
    game?: string
  ) => stats.getPlayerStats(game, statsArray);

  // UPDATE
  const onAddPlayerToDb = (
    player: IPlayer,
    addPlayerFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => playerlist.addPlayer(player, addPlayerFunc);

  const updateSelectedPlayerlist = ({
    selected,
    id,
  }: UpdateSelectedPlayerArgs) =>
    playerlist.updateSelectedPlayer({ selected, id });

  const onUpdatePlayerStats = (player: IPlayer, game: string) => {
    if (player.id !== undefined) {
      const statsToUpdate: number[] = [
        player.stats.gamesPlayed,
        player.stats.gamesWon,
        player.stats.gamesLost,
        player.id,
      ];

      stats.updatePlayerStats(game, statsToUpdate, player);
    }
  };

  // DELETE
  const onDeletePlayerFromDb = (
    playerId: number,
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>,
    playerList: IPlayer[]
  ) => playerlist.deletePlayer(playerId, setPlayersFunc, playerList);

  const dropTable = (
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => {
    playerlist.dropTable(setPlayersFunc);
    stats.dropTables();
    resumeGame.dropTable();
  };

  // HELPERS
  const calculateWinPercent = (
    gamesWon: number,
    gamesPlayed: number
  ): number => {
    let score = (gamesWon / gamesPlayed) * 100;
    if (isNaN(score)) return 0;
    else return score;
  };

  return {
    createTable,
    getPlayerlist,
    onAddPlayerToDb,
    dropTable,
    onDeletePlayerFromDb,
    updateSelectedPlayerlist,
    onUpdatePlayerStats,
    onGetPlayerStats,
    calculateWinPercent,
  };
};

export default useSqlite;
