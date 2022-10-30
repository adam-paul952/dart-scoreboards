import { IPlayer } from "@context/PlayerContext";
import db, { dbError, SqlControllerProps } from "..";
import {
  onCreateIndividualStats,
  onCreateStatsTable,
  onCreateX01Stats,
  onDropTables,
  onGetPlayerStats,
  onInsertNewRow,
  onUpdateOverallStats,
  onUpdatePlayerStats,
} from "./stats.model";

import { PlayerStats, BaseballStats, X01Stats } from "../../screens/Statistics";

// CREATE
export const createTables = () =>
  db.transaction(
    (tx) => {
      onCreateStatsTable({ transaction: tx, table: "stats" });
      onCreateIndividualStats({ transaction: tx, table: "baseball_stats" });
      onCreateIndividualStats({ transaction: tx, table: "cricket_stats" });
      onCreateIndividualStats({ transaction: tx, table: "elimination_stats" });
      onCreateIndividualStats({ transaction: tx, table: "killer_stats" });
      onCreateX01Stats({ transaction: tx, table: "x01_stats" });
    },
    (error) => {
      console.log(dbError, error);
    }
  );

export const insertNewStatsRow = (newId: number) =>
  db.transaction(
    (tx) => {
      onInsertNewRow({ transaction: tx, table: "stats", args: [newId] });
      onInsertNewRow({
        transaction: tx,
        table: "baseball_stats",
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: "cricket_stats",
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: "elimination_stats",
        args: [newId],
      });
      onInsertNewRow({ transaction: tx, table: "killer_stats", args: [newId] });
      onInsertNewRow({ transaction: tx, table: "x01_stats", args: [newId] });
    },
    (error) => {
      console.log(dbError, error);
    }
  );

// READ
export const getPlayerStats = (
  game: string | undefined,
  setStateFunc: React.Dispatch<React.SetStateAction<X01Stats[]>>
) =>
  db.transaction(
    (tx) => {
      if (game === undefined) game = "stats";
      onGetPlayerStats({ transaction: tx, table: game, setStateFunc });
    },
    (error) => {
      console.log(dbError, error);
    }
  );

//UPDATE
export const updatePlayerStats = (
  game: string,
  statsToUpdate: (string | number | null)[],
  player: IPlayer
) =>
  db.transaction(
    (tx) => {
      if (game === "baseball") {
        statsToUpdate.splice(-2, 1, player.stats.highScore);
        onUpdatePlayerStats({
          transaction: tx,
          table: "baseball_stats",
          args: statsToUpdate,
        });
      }

      onUpdateOverallStats({
        transaction: tx,
        table: "stats",
        args: statsToUpdate,
      });
    },
    (error) => {
      console.log(dbError, error);
    }
  );

//DELETE
export const dropTables = () =>
  db.transaction(
    (tx) => {
      onDropTables({ transaction: tx, table: "stats" });
      onDropTables({ transaction: tx, table: "baseball_stats" });
      onDropTables({ transaction: tx, table: "cricket_stats" });
      onDropTables({ transaction: tx, table: "elimination_stats" });
      onDropTables({ transaction: tx, table: "killer_stats" });
      onDropTables({ transaction: tx, table: "x01_stats" });
    },
    (error) => {
      console.log(dbError, error);
    }
  );
