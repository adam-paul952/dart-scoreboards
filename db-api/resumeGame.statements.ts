// CREATE
// create resume game table
export const createResumeTableStatement = `
  CREATE TABLE IF NOT EXISTS 
    resumeGames (id INTEGER PRIMARY KEY AUTOINCREMENT)
  `;

// READ

// UPDATE

// DELETE
// drop resume game table
export const dropResumeGameTable = `
  DROP TABLE IF EXISTS resumeGames
  `;
