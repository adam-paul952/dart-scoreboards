import db, { dbError, DbTables } from "..";
import {
  onAddGame,
  onCreateTable,
  onDropTable,
  onGetAllGames,
  onDeleteGame,
  onUpdateResumeGame,
} from "./resumeGame.model";

import {
  SaveResumeGameState,
  LoadResumeGameState,
} from "../../hooks/useResumeGame";
import { GameUndoState } from "../../screens/ResumeGame";

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
export const getGames = (
  setStateFunc: React.Dispatch<
    React.SetStateAction<LoadResumeGameState<GameUndoState>[]>
  >
) =>
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
      const {
        variant,
        undoState,
        players,
        date,
        time,
        gameSettings = null,
      } = data;
      // console.log([variant, undoState, players, date, time]);
      onAddGame({
        transaction: tx,
        table: DbTables.Resume,
        args: [variant, undoState, players, date, time, gameSettings],
      });
    },
    (error) => console.log(dbError, error)
  );

export const onUpdateGame = (data: SaveResumeGameState) => {
  const { undoState, players, date, time, id } = data;
  id !== undefined &&
    db.transaction((tx) => {
      onUpdateResumeGame({
        transaction: tx,
        table: DbTables.Resume,
        args: [undoState, players, date, time, id],
      });
    });
};

// DELETE
export const deleteSavedGame = (
  id: number,
  setStateFunc: React.Dispatch<
    React.SetStateAction<LoadResumeGameState<GameUndoState>[]>
  >
) =>
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
