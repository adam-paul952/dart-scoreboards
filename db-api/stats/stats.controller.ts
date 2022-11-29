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

const assignTableType = (game: GameVariants) => {
  switch (game) {
    case "baseball":
      return DbTables.Baseball;
    case "cricket":
      return DbTables.Cricket;
    case "elimination":
      return DbTables.Elimination;
    case "killer":
      return DbTables.Killer;
    case "x01":
      return DbTables.X01;
    case "overall":
      return DbTables.Overall;
    default:
      console.log(`Invalid game type supplied to Stats Controller`);
      break;
  }
};

// CREATE
export const createTables = () =>
  db.transaction(
    (tx) => {
      Object.entries(DbTables).forEach(([key, value]) => {
        if (key === "Players" || key === "Resume") return;
        else if (key === "Overall")
          onCreateStatsTable({ transaction: tx, table: value });
        else if (key === "X01")
          onCreateX01Stats({ transaction: tx, table: value });
        else onCreateIndividualStats({ transaction: tx, table: value });
      });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );

export const insertNewStatsRow = (newId: number) =>
  db.transaction(
    (tx) => {
      Object.values(DbTables).forEach((value) => {
        value === "playerlist" || value === "resume_game"
          ? null
          : onInsertNewRow({ transaction: tx, table: value, args: [newId] });
      });
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
      // console.log(`getPlayerstats called`);
      let table = assignTableType(game);
      if (table !== undefined)
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
    // console.log(`update player stats called`);
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
      Object.values(DbTables).forEach((table) => {
        table === "playerlist" || table === "resume_game"
          ? null
          : onDropTables({ transaction: tx, table });
      });
    },
    (error) => {
      // console.log(dbError, error);
    }
  );
