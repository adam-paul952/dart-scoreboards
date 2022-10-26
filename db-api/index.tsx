import { openDatabase } from "expo-sqlite";

const db = openDatabase("db.playerList.dev");

export const dbError = `DB Error: \n`;

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

export default db;
