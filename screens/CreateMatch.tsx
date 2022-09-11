import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "../components/CustomButton";
import Dropdown from "../components/Dropdown";

import { Text, View } from "../components/Themed";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

const data = [
  { label: "Baseball", value: "baseball" },
  { label: "Cricket", value: "cricket" },
  { label: "Elimination", value: "elimination" },
  { label: "Killer", value: "killer" },
  { label: "X01", value: "x01" },
];

const x01Data = [
  { label: "201", value: "201" },
  { label: "301", value: "301" },
  { label: "401", value: "401" },
  { label: "501", value: "501" },
  { label: "601", value: "601" },
  { label: "701", value: "701" },
  { label: "801", value: "801" },
  { label: "901", value: "901" },
  { label: "1001", value: "1001" },
  { label: "1501", value: "1501" },
];

const eliminationData = [
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

const CreateMatch = () => {
  const navigation = useNavigation();
  const { playerList, setPlayerList } = usePlayerState();

  const [game, setGame] = useState<null>(null);

  const [points, setPoints] = useState<number | null>(null);

  const disableButton = () => {
    if (game === null) return true;
    else if (game === "x01" && points === null) return true;
    else if (game === "elimination" && points === null) return true;
    else return false;
  };

  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        label="Choose Game:"
        value={game}
        setValue={setGame}
      />
      {game === "x01" && (
        <Dropdown
          data={x01Data}
          label="Points:"
          value={points}
          setValue={setPoints}
        />
      )}
      {game === "elimination" && (
        <Dropdown
          data={eliminationData}
          label="Lives:"
          value={points}
          setValue={setPoints}
        />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Continue to Game"
          buttonStyle={styles.buttonStyle}
          disabled={disableButton()}
          onPressOut={() => {
            // game === "x01" &&
            //   points !== null &&
            //   setPlayerList((prev: any) =>
            //     prev.forEach((player: IPlayer) => {
            //       player.score = points;
            //       return player;
            //     })
            //   );
            game !== null && navigation.navigate(game);
          }}
        />
      </View>
    </View>
  );
};

export default CreateMatch;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column" },
  buttonContainer: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  buttonStyle: { marginBottom: 20, width: "80%", alignSelf: "center" },
});
