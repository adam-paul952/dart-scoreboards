import { SaveResumeGameState } from "hooks/useResumeGame";
import db, { dbError, DbTables } from "..";
import {
  onAddGame,
  onCreateTable,
  onDropTable,
  onGetAllGames,
  onDeleteGame,
} from "./resumeGame.model";

// CREATE
export const createTable = () =>
  db.transaction(
    (tx) => {
      onCreateTable({ transaction: tx, table: DbTables.Resume });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

// READ
export const getGames = (setStateFunc: any) =>
  db.transaction(
    (tx) => {
      onGetAllGames({ transaction: tx, table: DbTables.Resume, setStateFunc });
    },
    (error) => {
      console.log(dbError, error);
    }
  );

// UPDATE
export const addGame = (data: SaveResumeGameState) =>
  db.transaction(
    (tx) => {
      const { variant, undoState, players, date, time } = data;
      // console.log([variant, undoState, players, date, time]);
      onAddGame({
        transaction: tx,
        table: DbTables.Resume,
        args: [variant, undoState, players, date, time],
      });
    },
    (error) => console.log(dbError, error)
  );

export const onUpdateGame = () => {};

// DELETE
export const deleteSavedGame = (id: number, setStateFunc: any) =>
  db.transaction(
    (tx) => {
      onDeleteGame({
        transaction: tx,
        table: DbTables.Resume,
        args: [id],
        setStateFunc,
      });
    },
    (error) => console.log(dbError, error)
  );

export const dropTable = () =>
  db.transaction(
    (tx) => onDropTable({ transaction: tx, table: DbTables.Resume }),
    (error) => {
      // console.log(dbError, error);
    }
  );
