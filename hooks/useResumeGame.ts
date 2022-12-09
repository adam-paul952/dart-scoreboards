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
  // delete
  const onDeleteGame = (id: number, setStateFunc: any) =>
    deleteSavedGame(id, setStateFunc);

  const onDropResumeTable = () => dropTable();

  // helpers
  const onAddGame = (
    variant: PlayableGameVariants,
    selectedPlayers: IPlayer[],
    undoState: any
  ) => {
    let players = JSON.stringify(
      selectedPlayers.map((player) => {
        return {
          id: player.id,
          name: player.name,
          score: player.score,
        };
      })
    );

    let date = new Date().toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let time = new Date().toLocaleTimeString("en-CA", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

    let undoStateToSave = JSON.stringify({
      past: [...undoState.past].concat(undoState.present),
      present: undoState.present,
      future: [...undoState.future],
    });

    onAddGameToStorage({
      variant,
      undoState: undoStateToSave,
      players,
      date,
      time: time.slice(0, 5),
    });
  };

  return {
    onCreateResumeTable,
    onGetAllSavedGames,
    onAddGameToStorage,
    onDropResumeTable,
    onDeleteGame,
    onAddGame,
  };
};

export default useResumeGame;
