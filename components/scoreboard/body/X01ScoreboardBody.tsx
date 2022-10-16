import React from "react";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { IPlayer } from "@context/PlayerContext";
import { Text, View } from "../../Themed";

interface IX01ScoreboardBodyProps {
  selectedPlayers: IPlayer[];
  currentPlayer: any;
}

const X01ScoreboardBody = (props: IX01ScoreboardBodyProps) => {
  const { selectedPlayers, currentPlayer } = props;

  return (
    <>
      {selectedPlayers.map((player: IPlayer) => {
        return (
          <View key={player.id} style={styles.playerRow}>
            <View
              style={[
                styles.playerColumn,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <View style={{ flex: 4 }}>
                <Text style={[styles.scoreboardText, { marginLeft: 25 }]}>
                  {player.name}
                </Text>
              </View>
              <View style={{ flex: 0.5 }}>
                {player.id === currentPlayer.id && (
                  <AntDesign name="caretleft" size={18} color="darkred" />
                )}
              </View>
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
