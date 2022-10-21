import { openDatabase } from "expo-sqlite";
import { IPlayer } from "@context/PlayerContext";

const db = openDatabase("db.playerList.dev");

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

const createTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS 
        playerlist (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT,
        selected INTEGER DEFAULT 1
        )`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS 
        stats (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        gamesWon INTEGER DEFAULT 0, 
        gamesLost INTEGER DEFAULT 0, 
        gamesPlayed INTEGER DEFAULT 0, 
        highScore INTEGER DEFAULT 0, 
        oneDartAverage INTEGER DEFAULT 0, 
        playerId INTEGER, 
          FOREIGN KEY(playerId) 
          REFERENCES playerlist(id) 
            ON DELETE CASCADE
        )`,
        [],
        () => {},
        (_, error) => {
          console.log(`error creating stats \n`, error);
          return false;
        }
      );
    },
    (error) => {
      console.log(`DB Error: \n`, error);
    },
    () => {
      console.log(`successfully created tables`);
    }
  );
};

const getPlayers = (
  setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) => {
  db.transaction(
    // calback in transaction
    (tx) => {
      tx.executeSql(
        // sql statement in transaction
        `SELECT * FROM playerlist`,
        // args to transaction
        [],
        // callback to the transaction
        (_, { rows: { _array } }) => {
          setPlayersFunc(
            _array.map((item) => {
              onGetPlayerStats(item, setPlayersFunc);
              item.id,
                item.name,
                item.selected === 1
                  ? (item.selected = true)
                  : (item.selected = false),
                (item.score = 0),
                (item.scoreList = []),
                (item.lives = 0),
                (item.killer = false);
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
      );
    },
    // error returned from the transaction
    (error) => {
      console.log(`DB Error: \n`, error);
    },
    // succes from the transaction
    () => {
      console.log(`successfully loaded players`);
    }
  );
};

const onGetPlayerStats = (player: any, setPlayersFunc: any) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT gamesWon, gamesLost, gamesPlayed, highScore, oneDartAverage FROM stats WHERE (playerId) = (?)`,
      [player.id],
      (_, { rows: { _array } }) => {
        setPlayersFunc((prev: IPlayer[]) =>
          prev.map((item) => {
            if (item.id === player.id) item.stats = _array[0];
            item.stats.darts = 0;
            return item;
          })
        );
      },
      (_, error) => {
        console.log(`DB Error: `, error);
        return false;
      }
    );
  });
  return player.stats;
};

const onAddPlayerToDb = (
  player: IPlayer,
  addPlayerFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO playerlist (name) values (?)`,
        [player.name],
        (_, resultSet) => {
          const newId = resultSet.insertId;
          addPlayerFunc((prev: IPlayer[]) =>
            prev.concat({ id: newId, ...player })
          );
          console.log(`successfully added player`);
          // add playerstats row to DB
          db.transaction(
            (tx) => {
              tx.executeSql(
                `INSERT INTO stats (playerId) values (?)`,
                [newId!],
                () => {
                  console.log(`successfully added playerstats row`);
                },
                (_, error) => {
                  console.log(`insert playerstats error \n`, error);
                  return false;
                }
              );
            },
            (error) => {
              console.log(`DB Error: \n`, error);
            }
          );
        },
        (_, error) => {
          console.log(`insert player error \n`, error);
          return false;
        }
      );
    },
    (error) => {
      console.log(`DB Error: \n`, error);
      return;
    }
  );
};

const onDeletePlayerFromDb = (
  playerId: number,
  setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  playerList: IPlayer[]
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "DELETE FROM playerlist WHERE id = ? ",
        [playerId],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = playerList.filter((player: IPlayer) => {
              if (player.id === playerId) return false;
              else return true;
            });
            setPlayersFunc(newList);
          }
        },
        (_, error) => {
          console.log(`error removing player \n`, error);
          return false;
        }
      );
    },
    (error) => {
      console.log(`DB Error: \n`, error);
    },
    () => {
      console.log(`successfully removed player`);
    }
  );
};

const dropTable = (setPlayersFunc: any) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS playerlist`, [], () => {
        setPlayersFunc(() => []);
      });
      tx.executeSql(`DROP TABLE IF EXISTS stats`);
    },
    (error) => {
      console.log(`DB Error: \n`, error);
    },
    () => {
      console.log(`successfully dropped table`);
    }
  );
};

export {
  createTable,
  getPlayers,
  onAddPlayerToDb,
  dropTable,
  onDeletePlayerFromDb,
};
