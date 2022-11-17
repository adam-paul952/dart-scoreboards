import { GameVariants } from "../../types";
import db from "..";
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

// CREATE
export const createTables = () =>
  db.transaction(
    (tx) => {
      onCreateStatsTable({ transaction: tx, table: "stats" });
      onCreateIndividualStats({ transaction: tx, table: "baseball_stats" });
      onCreateIndividualStats({ transaction: tx, table: "cricket_stats" });
      onCreateIndividualStats({ transaction: tx, table: "elimination_stats" });
      onCreateIndividualStats({ transaction: tx, table: "killer_stats" });
      onCreateX01Stats({ transaction: tx, table: "x01_stats" });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

export const insertNewStatsRow = (newId: number) =>
  db.transaction(
    (tx) => {
      onInsertNewRow({ transaction: tx, table: "stats", args: [newId] });
      onInsertNewRow({
        transaction: tx,
        table: "baseball_stats",
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: "cricket_stats",
        args: [newId],
      });
      onInsertNewRow({
        transaction: tx,
        table: "elimination_stats",
        args: [newId],
      });
      onInsertNewRow({ transaction: tx, table: "killer_stats", args: [newId] });
      onInsertNewRow({ transaction: tx, table: "x01_stats", args: [newId] });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

let table = "";
// READ
export const getPlayerStats = <T>(
  setStateFunc: React.Dispatch<React.SetStateAction<T[]>>,
  game: GameVariants
) =>
  db.transaction(
    (tx) => {
      if (game === "overall")
        onGetPlayerStats({ transaction: tx, table: "stats", setStateFunc });
      else {
        console.log(`if statement working: ${game}`);
        onGetPlayerStats({
          transaction: tx,
          table: `${game}_stats`,
          setStateFunc,
        });
      }
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

//UPDATE
// export const updateOverallPlayerStats = <T>(
//   statsToUpdate:T[]
// ) =>
//   ;

export const updatePlayerStats = (
  game: GameVariants,
  statsToUpdate: (string | number | null)[]
) => {
  console.log(`GAME: ${game}`);
  console.log(`STATS TO UPDATE: `, statsToUpdate);
  if (game === "overall")
    db.transaction((tx) => {
      onUpdateOverallStats({
        transaction: tx,
        table: "stats",
        args: statsToUpdate,
      });
    });
  else
    db.transaction(
      (tx) => {
        onUpdatePlayerStats({
          transaction: tx,
          table: `${game}_stats`,
          args: statsToUpdate,
        });
        // }
      },
      (error) => {
        // console.log(dbError, error);
      }
    );
};

//DELETE
export const dropTables = () =>
  db.transaction(
    (tx) => {
      onDropTables({ transaction: tx, table: "stats" });
      onDropTables({ transaction: tx, table: "baseball_stats" });
      onDropTables({ transaction: tx, table: "cricket_stats" });
      onDropTables({ transaction: tx, table: "elimination_stats" });
      onDropTables({ transaction: tx, table: "killer_stats" });
      onDropTables({ transaction: tx, table: "x01_stats" });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );
