import { SqlControllerProps } from "..";
import { insertNewStatsRow } from "../stats/stats.controller";
import { IPlayer } from "@context/PlayerContext";

// CREATE
export const onCreateTable = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`CREATE TABLE IF NOT EXISTS 
  ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT,
  selected INTEGER DEFAULT 1
  )
`);

// READ
export const onGetPlayers = ({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<IPlayer>) =>
  setStateFunc !== undefined
    ? transaction.executeSql(
        // sql statement in transaction
        `SELECT * FROM ${table}`,
        // args to transaction
        args,
        // callback to the transaction
        (_, { rows: { _array } }) => {
          setStateFunc(
            _array.map((item) => {
              // onGetPlayerStats(item, setPlayersFunc);
              item.id,
                item.name,
                item.selected === 1
                  ? (item.selected = true)
                  : (item.selected = false),
                (item.score = 0),
                (item.scoreList = []),
                (item.lives = 0),
                (item.killer = false);
              item.stats = {
                darts: 0,
                highscore: 0,
                gamesWon: 0,
                gamesLost: 0,
                gamesPlayed: 0,
                oneDartAverage: 0,
              };
              return item;
            })
          );
          return _array;
        },
        // error during the transaction
        (_, error) => {
          console.log(`db error load players \n`, error);
          return false;
        }
      )
    : null;

// UPDATE
export const onAddPlayer = ({
  transaction,
  table,
  args,
  state,
  setStateFunc,
}: SqlControllerProps<IPlayer>) =>
  setStateFunc !== undefined && state !== undefined
    ? transaction.executeSql(
        `INSERT INTO ${table} (name) values (?)`,
        args,
        (_, resultSet) => {
          const newId = resultSet.insertId;
          setStateFunc((prev) => prev.concat({ id: newId, ...state }));
          console.log(`successfully added player`);
          // add playerstats row to DB
          if (newId !== undefined) {
            insertNewStatsRow(newId);
          }
        },
        (_, error) => {
          console.log(`insert player error \n`, error);
          return false;
        }
      )
    : null;

export const onUpdateSelectedPlayer = ({
  transaction,
  table,
  args,
}: SqlControllerProps<IPlayer>) =>
  transaction.executeSql(
    `UPDATE ${table} SET selected = (?) WHERE id = (?)`,
    args,
    () => {
      console.log(`successfully updated selected row`);
    },
    (_, error) => {
      console.log(error);
      return false;
    }
  );

export const onDeletePlayer = ({
  transaction,
  table,
  args,
  setStateFunc,
  mainState,
}: SqlControllerProps<IPlayer>) =>
  args !== undefined && setStateFunc !== undefined && mainState !== undefined
    ? transaction.executeSql(
        `DELETE FROM ${table} WHERE (id) = (?) `,
        args,
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = mainState.filter((player) => {
              if (player.id === args[0]) return false;
              else return true;
            });
            setStateFunc(newList);
          }
        },
        (_, error) => {
          console.log(`error removing player \n`, error);
          return false;
        }
      )
    : null;

export const onDropTable = ({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<IPlayer>) =>
  setStateFunc !== undefined
    ? transaction.executeSql(`DROP TABLE IF EXISTS ${table}`, args, () => {
        setStateFunc(() => []);
      })
    : null;
