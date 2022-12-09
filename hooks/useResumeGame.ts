import { GameVariants } from "../types";

import {
  addGame,
  createTable,
  dropTable,
  getGames,
  deleteSavedGame,
} from "../db-api/resumeGame/resumeGame.controller";

import { UndoState } from "./useUndoRedo";
import { IPlayer } from "@context/PlayerContext";

export interface ResumeGameState {
  id?: number;
  variant: Exclude<GameVariants, "overall">;
  date: string;
  time: string;
}

export interface SaveResumeGameState extends ResumeGameState {
  players: string;
  undoState: string;
}

export interface LoadResumeGameState<T> extends ResumeGameState {
  players: IPlayer[];
  undoState: UndoState<T>;
}

const useResumeGame = () => {
  // create
  const onCreateResumeTable = () => createTable();
  // read
  const onGetAllSavedGames = (setStateFunc: any) => getGames(setStateFunc);
  // update
  const onAddGameToStorage = (data: SaveResumeGameState) => addGame(data);
  // delete
  const onDeleteGame = (id: number, setStateFunc: any) =>
    deleteSavedGame(id, setStateFunc);

  const onDropResumeTable = () => dropTable();

  return {
    onCreateResumeTable,
    onGetAllSavedGames,
    onAddGameToStorage,
    onDropResumeTable,
    onDeleteGame,
  };
};

export default useResumeGame;
