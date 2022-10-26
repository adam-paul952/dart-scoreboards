// CREATE
// create all stats table
export const createStatsTableStatement = `
CREATE TABLE IF NOT EXISTS 
  stats (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    gamesWon INTEGER DEFAULT 0, 
    gamesLost INTEGER DEFAULT 0, 
    gamesPlayed INTEGER DEFAULT 0, 
    highScore INTEGER DEFAULT 0, 
    oneDartAverage INTEGER DEFAULT 0, 
    win_percent INTEGER DEFAULT 0,
    playerId INTEGER, 
      FOREIGN KEY(playerId) 
      REFERENCES playerlist(id) 
        ON DELETE CASCADE
    )
  `;
// baseball
export const createBaseballStatsTable = `
CREATE TABLE IF NOT EXISTS
  baseball_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    win_percent INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `;

// READ
export const getStatsForPlayer = `
  SELECT gamesWon, 
    gamesLost, gamesPlayed, highScore, oneDartAverage, win_percent
      FROM stats WHERE (playerId) = (?)
  `;

// UPDATE
export const insertNewPlayerStats = `
  INSERT INTO stats 
    (playerId) values (?)
  `;
// baseball
export const insertNewBaseballRow = `
  INSERT INTO 
    baseball_stats (player_id) values (?)
  `;

// DELETE
// drop
export const dropStatsTable = `
  DROP TABLE IF EXISTS stats
  `;
// baseball
export const dropBaseballStats = `
    DROP TABLE IF EXISTS baseball_stats
  `;
