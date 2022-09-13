import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { IPlayer } from "@context/PlayerContext";
import { Text, View } from "../../Themed";

interface IX01ScoreboardBodyProps {
  playerList: IPlayer[];
}

const X01ScoreboardBody = (props: IX01ScoreboardBodyProps) => {
  const { playerList } = props;

  return (
    <>
      {playerList.map((player: IPlayer) => {
        return (
          <View key={player.id} style={styles.playerRow}>
            <View
              style={[
                styles.playerColumn,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Text style={[styles.scoreboardText, { flex: 2 }]}>
                {player.name}
              </Text>
              <AntDesign name="caretleft" size={18} color="darkred" />
            </View>
            <Text style={[styles.scoreboardText, { flex: 1 }]}>0</Text>
            <Text style={[styles.scoreboardText, { flex: 1 }]}>
              {player.score}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default X01ScoreboardBody;

const styles = StyleSheet.create({
  scoreboardText: { textAlign: "center", fontSize: 20 },
  playerRow: { flexDirection: "row" },
  playerColumn: {
    flex: 3,
    borderRightColor: "gray",
    borderRightWidth: 1,
  },
});
