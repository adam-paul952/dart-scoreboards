import { GameVariants } from "../../types";
import db, { DbTables } from "..";
import {
  onCreateIndividualStats,
  onCreateStatsTable,
  onCreateX01Stats,
  onDropTables,
  onGetPlayerStats,
  onInsertNewRow,
  onUpdateOverallStats,
  onUpdatePlayerStats,
} from "./stats.model";

const assignTableType = (game: string) => {
  switch (game) {
    case "baseball":
      return DbTables.Baseball;
    case "cricket":
      return DbTables.Cricket;
    case "elimination":
      return DbTables.Elimination;
    case "killer":
      return DbTables.Killer;
    case "X01":
      return DbTables.X01;
    default:
      console.log(`Invalid game type supplied to Stats Controller`);
      break;
  }
};

// CREATE
export const createTables = () =>
  db.transaction(
    (tx) => {
      onCreateStatsTable({ transaction: tx, table: DbTables.Overall });
      onCreateIndividualStats({ transaction: tx, table: DbTables.Baseball });
      onCreateIndividualStats({ transaction: tx, table: DbTables.Cricket });
      onCreateIndividualStats({ transaction: tx, table: DbTables.Elimination });
      onCreateIndividualStats({ transaction: tx, table: DbTables.Killer });
      onCreateX01Stats({ transaction: tx, table: DbTables.X01 });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

export const insertNewStatsRow = (newId: number) =>
  db.transaction(
    (tx) => {
      onInsertNewRow({
        transaction: tx,
        table: DbTables.Overall,
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: DbTables.Baseball,
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: DbTables.Cricket,
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: DbTables.Elimination,
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: DbTables.Killer,
        args: [newId],
      });
      onInsertNewRow({ transaction: tx, table: DbTables.X01, args: [newId] });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

// READ
export const getPlayerStats = <T>(
  setStateFunc: React.Dispatch<React.SetStateAction<T[]>>,
  game: GameVariants
) =>
  db.transaction(
    (tx) => {
      let table = assignTableType(game);
      if (game === "overall")
        onGetPlayerStats({
          transaction: tx,
          table: DbTables.Overall,
          setStateFunc,
        });
      else if (table !== undefined)
        onGetPlayerStats({
          transaction: tx,
          table,
          setStateFunc,
        });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

//UPDATE
export const updatePlayerStats = (
  game: GameVariants,
  statsToUpdate: (string | number | null)[]
) => {
  db.transaction((tx) => {
    let table = assignTableType(game);
    if (game === "overall")
      onUpdateOverallStats({
        transaction: tx,
        table: DbTables.Overall,
        args: statsToUpdate,
      });
    else if (table !== undefined)
      onUpdatePlayerStats({
        transaction: tx,
        table,
        args: statsToUpdate,
      });
  });
};

//DELETE
export const dropTables = () =>
  db.transaction(
    (tx) => {
      onDropTables({ transaction: tx, table: DbTables.Overall });
      onDropTables({ transaction: tx, table: DbTables.Baseball });
      onDropTables({ transaction: tx, table: DbTables.Cricket });
      onDropTables({ transaction: tx, table: DbTables.Elimination });
      onDropTables({ transaction: tx, table: DbTables.Killer });
      onDropTables({ transaction: tx, table: DbTables.X01 });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );
