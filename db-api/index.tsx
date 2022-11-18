import { openDatabase, SQLTransaction } from "expo-sqlite";

const db = openDatabase("db.playerList.dev");

export const dbError = `DB Error: \n`;

export interface SqlControllerProps<T> {
  transaction: SQLTransaction;
  table:
    | "stats"
    | "baseball_stats"
    | "cricket_stats"
    | "elimination_stats"
    | "killer_stats"
    | "x01_stats";
  args?: (string | number | null)[];
  state?: T;
  setStateFunc?: React.Dispatch<React.SetStateAction<T[]>>;
  mainState?: T[];
}

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

export default db;
