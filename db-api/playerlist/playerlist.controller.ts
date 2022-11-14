import db, { dbError } from "..";
import {
  onAddPlayer,
  onCreateTable,
  onDeletePlayer,
  onDropTable,
  onGetPlayers,
  onUpdateSelectedPlayer,
} from "./playerlist.model";

import { IPlayer } from "@context/PlayerContext";
import React from "react";

// CREATE
export const createTable = () =>
  db.transaction(
    (tx) => onCreateTable({ transaction: tx, table: "playerlist" }),
    (error) => {
      // console.log(dbError, error);
    }
  );

// READ
export const getPlayers = (
  setStateFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) =>
  db.transaction(
    (tx) =>
      onGetPlayers({ transaction: tx, table: "playerlist", setStateFunc }),
    (error) => {
      // console.log(dbError, error);
    }
  );

// UPDATE
export const addPlayer = (
  state: IPlayer,
  setStateFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) =>
  db.transaction(
    (tx) =>
      onAddPlayer({
        transaction: tx,
        table: "playerlist",
        args: [state.name],
        state,
        setStateFunc,
      }),
    (error) => {
      // console.log(dbError, error);
    }
  );

export const updateSelectedPlayer = (state: { selected: number; id: number }) =>
  db.transaction(
    (tx) =>
      onUpdateSelectedPlayer({
        transaction: tx,
        table: "playerlist",
        args: [state.selected, state.id],
      }),
    (error) => {
      // console.log(dbError, error);
    }
  );

// DELETE
export const deletePlayer = (
  playerId: number,
  setStateFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  mainState: IPlayer[]
) =>
  db.transaction(
    (tx) =>
      onDeletePlayer({
        transaction: tx,
        table: "playerlist",
        args: [playerId],
        setStateFunc,
        mainState,
      }),
    (error) => {
      // console.log(dbError, error);
    }
  );

export const dropTable = (
  setStateFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) =>
  db.transaction(
    (tx) => onDropTable({ transaction: tx, table: "playerlist", setStateFunc }),
    (error) => {
      // console.log(dbError, error);
    }
  );
