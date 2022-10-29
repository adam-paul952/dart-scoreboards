// CREATE
// create all stats table
export const createStatsTableStatement = `
CREATE TABLE IF NOT EXISTS 
  stats (id INTEGER PRIMARY KEY AUTOINCREMENT, 
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
  `;
// baseball
export const createBaseballStatsTable = `
CREATE TABLE IF NOT EXISTS
  baseball_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `;
// cricket
export const createCricketStatsTable = `
CREATE TABLE IF NOT EXISTS
  cricket_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `;
// x01
export const createX01StatsTable = `
CREATE TABLE IF NOT EXISTS
  x01_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  `;
// elimination
export const createEliminationStatsTable = `
CREATE TABLE IF NOT EXISTS
  elimination_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `;
// killer
export const createKillerStatsTable = `
CREATE TABLE IF NOT EXISTS
  killer_stats (id INTEGER PRIMARY KEY AUTOINCREMENT,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    highscore INTEGER DEFAULT 0,
    player_id INTEGER,
      FOREIGN KEY(player_id)
      REFERENCES playerlist(id)
        ON DELETE CASCADE
    )
  `;

// READ
export const getStatsForPlayer = `
  SELECT playerlist.id, playerlist.name, stats.games_won, 
  stats.games_lost, stats.games_played, stats.one_dart_average
      FROM playerlist INNER JOIN stats ON (stats.player_id = playerlist.id)
  `;
export const getBaseballStatsAll = `
  SELECT playerlist.id, playerlist.name, baseball_stats.games_won, baseball_stats.games_lost, baseball_stats.games_played, baseball_stats.highscore
  FROM playerlist INNER JOIN baseball_stats ON (baseball_stats.player_id = playerlist.id)
  `;

// UPDATE
export const insertNewPlayerStats = `
  INSERT INTO stats 
    (player_id) values (?)
  `;
export const updatePlayerOverallStats = `
    UPDATE stats 
    SET games_played = (?), games_won = (?), games_lost = (?)
    WHERE player_id = (?)
    `;
// baseball
export const insertNewBaseballRow = `
  INSERT INTO 
    baseball_stats (player_id) values (?)
  `;
export const updatePlayerBaseballStats = `
  UPDATE baseball_stats 
  SET games_played = (?), games_won = (?), games_lost = (?), highscore = (?)
  WHERE player_id = (?)
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
