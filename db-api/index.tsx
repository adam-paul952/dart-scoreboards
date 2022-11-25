import { openDatabase, SQLTransaction } from "expo-sqlite";

const db = openDatabase("db.playerList.dev");

export const dbError = `DB Error: \n`;

export enum DbTables {
  Overall = "stats",
  Baseball = "baseball_stats",
  Cricket = "cricket_stats",
  Elimination = "elimination_stats",
  Killer = "killer_stats",
  X01 = "x01_stats",
  Players = "playerlist",
  Resume = "resume_game",
}

export interface SqlControllerProps<T> {
  transaction: SQLTransaction;
  table: DbTables;
  args?: (string | number | null)[];
  state?: T;
  setStateFunc?: React.Dispatch<React.SetStateAction<T[]>>;
  mainState?: T[];
}

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

export default db;
