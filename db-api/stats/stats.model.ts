import { SqlControllerProps } from "db-api";
import { X01Stats } from "screens/Statistics";

// CREATE
export const onCreateStatsTable = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`CREATE TABLE IF NOT EXISTS 
  ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    games_won INTEGER DEFAULT 0, 
    games_lost INTEGER DEFAULT 0, 
    games_played INTEGER DEFAULT 0,  
    one_dart_average INTEGER DEFAULT 0,
    checkouts INTEGER DEFAULT 0,
    checkout_attempts INTEGER DEFAULT 0,
    player_id INTEGER, 
      FOREIGN KEY(player_id) 
      REFERENCES playerlist(id) 
        ON DELETE CASCADE
    )
  `);

export const onCreateIndividualStats = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`
  CREATE TABLE IF NOT EXISTS 
    ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `);

export const onCreateX01Stats = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`
  CREATE TABLE IF NOT EXISTS
    ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT,
      games_won INTEGER DEFAULT 0,
      games_lost INTEGER DEFAULT 0,
      games_played INTEGER DEFAULT 0,
      highscore INTEGER DEFAULT 0,
      one_dart_average INTEGER DEFAULT 0,
      checkouts INTEGER DEFAULT 0,
      checkout_attempts INTEGER DEFAULT 0,
      player_id INTEGER,
        FOREIGN KEY(player_id)
        REFERENCES playerlist(id)
          ON DELETE CASCADE
      )
    `);

export const onInsertNewRow = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) =>
  transaction.executeSql(
    `INSERT INTO ${table} (player_id) values (?)`,
    args,
    () => {},
    (_, error) => {
      console.log(error);
      return false;
    }
  );

// READ
export const onGetPlayerStats = ({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<X01Stats>) => {
  let sqlStatement = "";

  if (
    table === "baseball" ||
    table === "cricket" ||
    table === "elimination" ||
    table === "killer"
  )
    sqlStatement = `
    SELECT playerlist.id, playerlist.name,
      ${table}_stats.games_won, ${table}_stats.games_lost, 
      ${table}_stats.games_played, ${table}_stats.highscore
    FROM playerlist 
    INNER JOIN ${table}_stats ON (${table}_stats.player_id = playerlist.id)
    `;
  else if (table === "x01")
    sqlStatement = `
    SELECT playerlist.id, playerlist.name,
      ${table}_stats.games_won, ${table}_stats.games_lost, 
      ${table}_stats.games_played, ${table}_stats.highscore, ${table}_stats.one_dart_average
    FROM playerlist 
    INNER JOIN ${table}_stats ON (${table}_stats.player_id = playerlist.id)
    `;
  else
    sqlStatement = `
    SELECT playerlist.id, playerlist.name, stats.games_won, 
      stats.games_lost, stats.games_played, stats.one_dart_average
    FROM playerlist 
    INNER JOIN stats ON (stats.player_id = playerlist.id)
    `;

  if (setStateFunc !== undefined)
    transaction.executeSql(
      sqlStatement,
      args,
      (_, { rows: { _array } }) => {
        setStateFunc(() => _array.map((item) => item));
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
};

// UPDATE
export const onUpdateOverallStats = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) =>
  transaction.executeSql(
    `UPDATE ${table} 
    SET games_played = (?), games_won = (?), games_lost = (?)
    WHERE player_id = (?)
    `,
    args,
    () => {},
    (_, error) => {
      console.log(error);
      return false;
    }
  );

export const onUpdatePlayerStats = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) =>
  transaction.executeSql(
    `UPDATE ${table} 
    SET games_played = (?), games_won = (?), games_lost = (?),
        highscore = (?)
    WHERE player_id = (?)
    `,
    args,
    () => {},
    (_, error) => {
      console.log(error);
      return false;
    }
  );

// DELETE
export const onDropTables = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`DROP TABLE IF EXISTS ${table}
`);
