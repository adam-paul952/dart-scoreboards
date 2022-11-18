import * as playerlist from "../db-api/playerlist/playerlist.controller";
import * as stats from "../db-api/stats/stats.controller";
import * as resumeGame from "../db-api/resumeGame/resumeGame.controller";

import { IPlayer } from "@context/PlayerContext";

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

  // const onGetPlayerStats = <T>(
  //   statsArray: React.Dispatch<React.SetStateAction<T[]>>,
  //   game: GameVariants
  // ) => stats.;

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

  // const onUpdatePlayerStats = (player: IPlayer, game: GameVariants) => {
  //   if (player.id !== undefined) {
  //     const statsToUpdate: number[] = [
  //       player.stats.gamesPlayed,
  //       player.stats.gamesWon,
  //       player.stats.gamesLost,
  //       player.id,
  //     ];

  //     stats.updatePlayerStats(game, statsToUpdate);
  //   }
  // };

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
    // onUpdatePlayerStats,
    // onGetPlayerStats,
    calculateWinPercent,
  };
};

export default useSqlite;
