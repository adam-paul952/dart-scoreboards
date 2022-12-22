import { SqlControllerProps } from "..";
import { LoadResumeGameState } from "../../hooks/useResumeGame";
import { GameUndoState } from "../../screens/ResumeGame";

// CREATE
export const onCreateTable = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`
  CREATE TABLE IF NOT EXISTS 
    ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, state TEXT NOT NULL, 
    selected_players TEXT NOT NULL, date TEXT NOT NULL,
    time TEXT NOT NULL, settings INTEGER
  )
`);

// READ
export const onGetAllGames = ({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<LoadResumeGameState<GameUndoState>>) => {
  setStateFunc !== undefined &&
    transaction.executeSql(
      `
  SELECT * from ${table};
  `,
      args,
      (_, { rows: { _array } }) => {
        // console.log(`Array from get games: `, _array);
        setStateFunc(() =>
          _array.map((item) => {
            item.id;
            item.variant = item.name;
            item.date;
            item.time;
            item.settings;
            item.players = JSON.parse(item.selected_players);
            item.undoState = JSON.parse(item.state);
            delete item.selected_players;
            delete item.state;
            return item;
          })
        );
      },
      (_, error) => {
        // console.log(`db error loading games: `, error);
        return false;
      }
    );
};

// UPDATE
export const onAddGame = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) =>
  transaction.executeSql(
    `INSERT INTO ${table} 
      (name, state, selected_players, date, time, settings) 
      values (?, ?, ?, ?, ?, ?)`,
    args,
    (_, resultSet) => {
      console.log(`Results from add to DB: `, resultSet);
    },
    (_, error) => {
      console.log(`Inert new game error: `, error);
      return false;
    }
  );

export const onUpdateResumeGame = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) =>
  transaction.executeSql(
    `UPDATE ${table} 
    SET state = (?), selected_players = (?), date = (?), time = (?) 
    WHERE id = (?)
    `,
    args,
    () => {},
    (_, error) => {
      // console.log(error);
      return false;
    }
  );

// DELETE
export const onDeleteGame = ({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<LoadResumeGameState<GameUndoState>>) =>
  setStateFunc !== undefined
    ? transaction.executeSql(
        `DELETE FROM ${table} WHERE id = (?)`,
        args,
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            setStateFunc((prev) =>
              prev.filter((savedGame) =>
                savedGame.id === args[0] ? false : true
              )
            );
          }
        },
        (_, error) => {
          // console.log(`error removing saved game \n`, error);
          return false;
        }
      )
    : null;

export const onDropTable = ({ transaction, table }: SqlControllerProps<null>) =>
  transaction.executeSql(`DROP TABLE IF EXISTS ${table}`);
