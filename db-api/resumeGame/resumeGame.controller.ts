import db, { dbError } from "..";
import { onCreateTable, onDropTable } from "./resumeGame.model";

// CREATE
export const createTable = () =>
  db.transaction(
    (tx) => {
      onCreateTable({ transaction: tx, table: "resumeGames" });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );
// READ

// UPDATE

// DELETE
export const dropTable = () =>
  db.transaction(
    (tx) => onDropTable({ transaction: tx, table: "resumeGames" }),
    (error) => {
      // console.log(dbError, error);
    }
  );
