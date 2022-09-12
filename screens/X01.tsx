import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, TextInput, View } from "../components/Themed";
import { IPlayer, usePlayerState } from "../context/PlayerContext";
import { AntDesign } from "@expo/vector-icons";

const header = ["Player", "Legs", "Points"];

const X01 = () => {
  const { playerList } = usePlayerState();

  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmitScore = () => {
    const validateInput = /^d+$/;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}>
        <View style={styles.scoreboardRow}>
          {header.map((text) => {
            return (
              <View
                key={text}
                style={
                  text === "Player"
                    ? styles.playerHeaderColumn
                    : styles.pointsHeaderColumn
                }
              >
                <Text style={styles.scoreboardText}>{text}</Text>
              </View>
            );
          })}
        </View>
        <View>
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
                  <AntDesign
                    name="caretleft"
                    size={18}
                    color="darkred"
                    style={{}}
                  />
                </View>
                <Text style={[styles.scoreboardText, { flex: 1 }]}>0</Text>
                <Text style={[styles.scoreboardText, { flex: 1 }]}>
                  {player.score}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextInput
            autoFocus
            style={styles.scoreInput}
            keyboardType="numeric"
            blurOnSubmit={false}
            maxLength={3}
          />
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            No Outshots Available
          </Text>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontSize: 15 }}>Darts: 0</Text>
          <Text>1 Dart: --</Text>
          <Text>High Score: --</Text>
          <Text>CO: --</Text>
        </View>
      </View>
    </View>
  );
};

export default X01;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", paddingTop: 20 },
  scoreboardRow: { flexDirection: "row", justifyContent: "center" },
  playerHeaderColumn: {
    flex: 3,
    borderRightColor: "gray",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  pointsHeaderColumn: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  scoreboardText: { textAlign: "center", fontSize: 20 },
  playerRow: { flexDirection: "row" },
  playerColumn: {
    flex: 3,
    borderRightColor: "gray",
    borderRightWidth: 1,
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    width: "25%",
    height: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
  },
});
