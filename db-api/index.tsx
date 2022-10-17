import { openDatabase } from "expo-sqlite";
import { IPlayer } from "@context/PlayerContext";

const db = openDatabase("db.playerList.dev");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS playerlist (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`
    );
  });
};

const getPlayers = (
  setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM playerlist`,
        [],
        (_, { rows: { _array } }) => {
          _array.map((item) => {
            item.id,
              item.name,
              (item.score = 0),
              (item.selected = true),
              (item.scoreList = []),
              (item.lives = 0),
              (item.killer = false),
              (item.stats = {
                highScore: 0,
                oneDartAverage: 0,
                darts: 0,
              });
            return item;
          });
          setPlayersFunc(_array);
        }
      );
    },
    // @ts-ignore
    (t: any, error: any) => {
      console.log(`db error load players`);
      console.log(error);
    },
    (_t: any, _success: any) => {
      console.log(`loaded players`);
    }
  );
};

const onnAddPlayerToDb = (player: IPlayer, addPlayerFunc: any) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO playerlist (name) values (?)`,
        [player.name],
        (txObject, resultSet) => {
          addPlayerFunc((prev: any) =>
            prev.concat({ id: resultSet.insertId, ...player })
          );
        }
      );
    },
    // @ts-ignore
    (t: any, error: any) => {
      console.log(`db error adding player`);
      console.log(error);
    },
    (_t: any, _success: any) => {
      console.log(`added player`);
    }
  );
};

const onDeletePlayerFromDb = (
  playerId: number,
  setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>,
  playerList: IPlayer[]
) => {
  db.transaction((tx) => {
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
      }
    );
  });
};

const dropTable = () => {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS playerlist`);
  });
};

export {
  createTable,
  getPlayers,
  onnAddPlayerToDb,
  dropTable,
  onDeletePlayerFromDb,
};
