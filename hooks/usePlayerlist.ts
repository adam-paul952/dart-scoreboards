import {
  createTable,
  getPlayers,
  addPlayer,
  updateSelectedPlayer,
  deletePlayer,
  dropTable,
} from "../db-api/playerlist/playerlist.controller";

import { IPlayer } from "@context/PlayerContext";

type UpdateSelectedPlayerArgs = {
  selected: number;
  id: number;
};

const usePlayerlist = () => {
  const onCreatePlayerlist = () => createTable();

  const onGetPlayerlist = (
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => getPlayers(setPlayersFunc);

  const onAddPlayerToDb = (
    player: IPlayer,
    addPlayerFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => addPlayer(player, addPlayerFunc);

  const updateSelectedPlayerlist = ({
    selected,
    id,
  }: UpdateSelectedPlayerArgs) => updateSelectedPlayer({ selected, id });

  const onDeletePlayerFromDb = (
    playerId: number,
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => deletePlayer(playerId, setPlayersFunc);

  const onDropPlayerlist = (
    setPlayersFunc: React.Dispatch<React.SetStateAction<IPlayer[]>>
  ) => dropTable(setPlayersFunc);

  return {
    onCreatePlayerlist,
    onGetPlayerlist,
    onAddPlayerToDb,
    updateSelectedPlayerlist,
    onDeletePlayerFromDb,
    onDropPlayerlist,
  };
};

export default usePlayerlist;
