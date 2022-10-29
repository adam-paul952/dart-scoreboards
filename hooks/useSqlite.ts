import db, { dbError } from "../db-api";
import {
  createPlayerTableStatement,
  getAllPlayersStatement,
  insertNewPlayer,
  deletePlayer,
  dropPlayerTable,
  updateSelectedPlayers,
} from "../db-api/playerlist.statements";

import {
  createStatsTableStatement,
  createBaseballStatsTable,
  getStatsForPlayer,
  dropStatsTable,
  insertNewBaseballRow,
  insertNewPlayerStats,
  dropBaseballStats,
  updatePlayerBaseballStats,
  getBaseballStatsAll,
  updatePlayerOverallStats,
} from "../db-api/stats.statements";

import {
  createResumeTableStatement,
  dropResumeGameTable,
} from "../db-api/resumeGame.statements";

import { IPlayer } from "@context/PlayerContext";
import { PlayerStats, BaseballStats } from "../screens/Statistics";

const useSqlite = () => {
  const createTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(createPlayerTableStatement);
        tx.executeSql(createStatsTableStatement);
        tx.executeSql(createBaseballStatsTable);
        tx.executeSql(
          createResumeTableStatement,
          [],
          () => {},
          (_, error) => {
            console.log(`error creating tables \n`, error);
            return false;
          }
        );
      },
      (error) => {
        console.log(dbError, error);
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
          getAllPlayersStatement,
          // args to transaction
          [],
          // callback to the transaction
          (_, { rows: { _array } }) => {
            setPlayersFunc(
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
        );
      },
      // error returned from the transaction
      (error) => {
        console.log(dbError, error);
      },
      // succes from the transaction
      () => {
        console.log(`successfully loaded players`);
      }
    );
  };

  const onGetPlayerStats = (statsArray: any) => {
    db.transaction((tx) => {
      tx.executeSql(
        getStatsForPlayer,
        [],
        (_, { rows: { _array } }) => {
          statsArray(() => _array.map((item) => item));
        },
        (_, error) => {
          console.log(dbError, error);
          return false;
        }
      );
    });
  };

  const onAddPlayerToDb = (
    player: IPlayer,
    addPlayerFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          insertNewPlayer,
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
                  insertNewPlayerStats,
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
                console.log(dbError, error);
              }
            );
            db.transaction(
              (tx) => {
                tx.executeSql(
                  insertNewBaseballRow,
                  [newId!],
                  () => {
                    console.log(`successfully added new baseball stats row`);
                  },
                  (_, error) => {
                    console.log(`insert baseball stats error \n`, error);
                    return false;
                  }
                );
              },
              (error) => {
                console.log(dbError, error);
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
        console.log(dbError, error);
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
          deletePlayer,
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
        console.log(dbError, error);
      },
      () => {
        console.log(`successfully removed player`);
      }
    );
  };

  const dropTable = (setPlayersFunc: any) => {
    db.transaction(
      (tx) => {
        tx.executeSql(dropPlayerTable, [], () => {
          setPlayersFunc(() => []);
        });
        tx.executeSql(dropStatsTable);
        tx.executeSql(dropResumeGameTable);
        tx.executeSql(dropBaseballStats);
      },
      (error) => {
        console.log(dbError, error);
      },
      () => {
        console.log(`successfully dropped table`);
      }
    );
  };

  const updateSelectedPlayerlist = ({
    selected,
    id,
  }: {
    selected: number;
    id: number;
  }) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          updateSelectedPlayers,
          [selected, id],
          () => {
            console.log(`successfully updated selected row`);
          },
          (_, error) => {
            console.log(error);
            return false;
          }
        );
      },
      (error) => {
        console.log(dbError, error);
      },
      () => {
        console.log(`successfully updated selected player`);
      }
    );
  };

  const onUpdatePlayerStats = (player: IPlayer, game?: string) => {
    db.transaction(
      (tx) => {
        if (game === "baseball") {
          tx.executeSql(
            updatePlayerBaseballStats,
            [
              player.stats.gamesPlayed,
              player.stats.gamesWon,
              player.stats.gamesLost,
              player.stats.highScore,
              player.id!,
            ],
            (_, error) => {
              console.log(error);
              return false;
            }
          );
        }
        tx.executeSql(
          updatePlayerOverallStats,
          [
            player.stats.gamesPlayed,
            player.stats.gamesWon,
            player.stats.gamesLost,
            player.id!,
          ],
          (_, error) => {
            console.log(error);
            return false;
          }
        );
      },
      (error) => {
        console.log(dbError, error);
      },
      () => {
        console.log(`successfully updated player stats`);
      }
    );
  };

  const onGetAllPlayerBaseballStats = (
    statsArray:
      | React.Dispatch<React.SetStateAction<PlayerStats[]>>
      | React.Dispatch<React.SetStateAction<BaseballStats[]>>
  ) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          getBaseballStatsAll,
          [],
          (_, { rows: { _array } }) => {
            statsArray(() => _array.map((item) => item));
          },
          (_, error) => {
            console.log(error);
            return false;
          }
        );
      },
      (error) => {
        console.log(dbError, error);
      },
      () => {
        console.log(`successfully read all player baseball stats`);
      }
    );
  };

  const calculateWinPercent = (
    gamesWon: number,
    gamesPlayed: number
  ): number => {
    let score = (gamesWon / gamesPlayed) * 100;
    if (isNaN(score)) return 0;
    else return score;
  };

  return {
    createTable,
    getPlayers,
    onAddPlayerToDb,
    dropTable,
    onDeletePlayerFromDb,
    updateSelectedPlayerlist,
    onUpdatePlayerStats,
    onGetAllPlayerBaseballStats,
    onGetPlayerStats,
    calculateWinPercent,
  };
};

export default useSqlite;
