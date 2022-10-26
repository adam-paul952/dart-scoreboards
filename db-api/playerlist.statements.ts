// CREATE
// create players table
export const createPlayerTableStatement = `
  CREATE TABLE IF NOT EXISTS 
    playerlist (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    selected INTEGER DEFAULT 1
    )
  `;

// READ
export const getAllPlayersStatement = `
  SELECT * FROM playerlist
  `;

// UPDATE
// insert into playerlist
export const insertNewPlayer = `
  INSERT INTO playerlist 
    (name) values (?)
  `;
// selected players
export const updateSelectedPlayers = `
UPDATE playerlist SET selected = (?) WHERE id = (?)
`;

// DELETE
// delete player
export const deletePlayer = `
  DELETE FROM playerlist 
    WHERE (id) = (?) 
  `;
// drop table
export const dropPlayerTable = `
  DROP TABLE IF EXISTS playerlist
  `;
