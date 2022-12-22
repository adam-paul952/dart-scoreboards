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
import { GameUndoState } from "../screens/ResumeGame";

export interface ResumeGameState {
  id?: number;
  variant: Exclude<GameVariants, "overall">;
  date: string;
  time: string;
}

export interface SaveResumeGameState extends ResumeGameState {
  players: string;
  undoState: string;
  gameSettings?: string | number | null;
}

export interface LoadResumeGameState<T> extends ResumeGameState {
  players: IPlayer[];
  undoState: UndoState<T>;
  settings?: string | number | null;
}

const useResumeGame = () => {
  // create
  const onCreateResumeTable = () => createTable();
  // read
  const onGetAllSavedGames = (
    setStateFunc: React.Dispatch<
      React.SetStateAction<LoadResumeGameState<GameUndoState>[]>
    >
  ) => getGames(setStateFunc);
  // update
  const onAddGameToStorage = (data: SaveResumeGameState) => addGame(data);

  const onUpdateSavedGame = (data: SaveResumeGameState) => onUpdateGame(data);
  // delete
  const onDeleteGame = (
    id: number,
    setStateFunc: React.Dispatch<
      React.SetStateAction<LoadResumeGameState<GameUndoState>[]>
    >
  ) => deleteSavedGame(id, setStateFunc);

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

  const onAddGame = <T>(
    variant: PlayableGameVariants,
    selectedPlayers: IPlayer[],
    undoState: UndoState<T>,
    gameSettings?: number | string,
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
          gameSettings: gameSettings === undefined ? null : gameSettings,
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
