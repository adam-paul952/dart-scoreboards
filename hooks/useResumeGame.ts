import { GameVariants } from "../types";

import {
  addGame,
  createTable,
  dropTable,
  getGames,
  deleteSavedGame,
  onUpdateGame,
} from "../db-api/resumeGame/resumeGame.controller";

import { UndoState } from "./useUndoRedo";
import { IPlayer } from "@context/PlayerContext";
import { PlayableGameVariants } from "./useGame";

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

  const onUpdateSavedGame = (data: SaveResumeGameState) => onUpdateGame(data);
  // delete
  const onDeleteGame = (id: number, setStateFunc: any) =>
    deleteSavedGame(id, setStateFunc);

  const onDropResumeTable = () => dropTable();

  // helpers
  const getDate = new Date().toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTime = new Date()
    .toLocaleTimeString("en-CA", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    })
    .slice(0, 5);

  const onAddGame = (
    variant: PlayableGameVariants,
    selectedPlayers: IPlayer[],
    undoState: any,
    id?: number
  ) => {
    let players = JSON.stringify(selectedPlayers.map((player) => player));

    let undoStateToSave = JSON.stringify({
      past: [...undoState.past].concat(undoState.present),
      present: undoState.present,
      future: [...undoState.future],
    });

    id !== undefined
      ? onUpdateSavedGame({
          id,
          undoState: undoStateToSave,
          players,
          date: getDate,
          time: getTime,
          variant,
        })
      : onAddGameToStorage({
          variant,
          undoState: undoStateToSave,
          players,
          date: getDate,
          time: getTime,
        });
  };

  return {
    onCreateResumeTable,
    onGetAllSavedGames,
    onAddGameToStorage,
    onUpdateSavedGame,
    onDropResumeTable,
    onDeleteGame,
    onAddGame,
  };
};

export default useResumeGame;
