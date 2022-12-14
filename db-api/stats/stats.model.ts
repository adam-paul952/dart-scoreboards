import { SqlControllerProps } from "db-api";

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
    (_, error) =>
      // console.log(error);
      false
  );

// READ
export const onGetPlayerStats = <T>({
  transaction,
  table,
  args = [],
  setStateFunc,
}: SqlControllerProps<T>) => {
  let sqlStatement = "";

  if (table === "x01_stats")
    sqlStatement = `
  SELECT playerlist.id, playerlist.name,
  ${table}.games_won, ${table}.games_lost, 
  ${table}.games_played, ${table}.highscore, ${table}.one_dart_average
  FROM playerlist 
  INNER JOIN ${table} ON (${table}.player_id = playerlist.id)
  `;
  else if (table === "stats")
    sqlStatement = `
  SELECT stats.games_played, stats.games_won, 
  stats.games_lost, stats.one_dart_average, playerlist.id, playerlist.name 
  FROM playerlist 
  INNER JOIN stats ON (stats.player_id = playerlist.id)
  `;
  else
    sqlStatement = `
    SELECT ${table}.games_played, ${table}.games_won, 
      ${table}.games_lost, ${table}.highscore, 
      playerlist.id, playerlist.name
    FROM playerlist 
    INNER JOIN ${table} ON (${table}.player_id = playerlist.id)
    `;

  setStateFunc !== undefined
    ? transaction.executeSql(
        sqlStatement,
        args,
        (_, { rows: { _array } }) => {
          setStateFunc(() => _array.map((item) => item));
        },
        (_, error) =>
          // console.log(error);
          false
      )
    : null;
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
    (_, error) =>
      // console.log(error);
      false
  );

export const onUpdatePlayerStats = ({
  transaction,
  table,
  args,
}: SqlControllerProps<null>) => {
  transaction.executeSql(
    `UPDATE ${table} 
    SET games_played = (?), games_won = (?), games_lost = (?),
        highscore = (?)
    WHERE player_id = (?)
    `,
    args,
    () => {},
    (_, error) =>
      // console.log(error);
      false
  );
};

// DELETE
export const onDropTables = ({
  transaction,
  table,
}: SqlControllerProps<null>) =>
  transaction.executeSql(`DROP TABLE IF EXISTS ${table}
`);
