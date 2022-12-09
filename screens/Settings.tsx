import React from "react";
import { Alert, StyleSheet } from "react-native";

import { usePlayerState } from "@context/PlayerContext";
import usePlayerlist from "../hooks/usePlayerlist";
import usePlayerStats from "../hooks/usePlayerStats";
import useResumeGame from "../hooks/useResumeGame";

import { Text, View } from "../components/Themed";
import CustomButton from "@components/CustomButton";

const UserSettings = () => {
  const { setPlayerList } = usePlayerState();
  const { onCreateResumeTable, onDropResumeTable } = useResumeGame();
  const { onCreateStats, onDropPlayerStats } = usePlayerStats();
  const { onCreatePlayerlist, onDropPlayerlist } = usePlayerlist();

  const onDropPress = () => {
    onDropResumeTable();
    // onDropPlayerStats();
    // onDropPlayerlist(setPlayerList);

    // onCreatePlayerlist();
    // onCreateStats();
    onCreateResumeTable();
  };

  const onDeleteAllPlayerInfo = () => {
    Alert.alert(
      "WARNING:",
      "Are you sure you wish to delete all player names and stats? \n\nThis action cannot be undone",
      [
        {
          text: "Delete",
          onPress: () => onDropPress(),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.9,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This is where registered {"\n"} user settings will be:
        </Text>
        <Text style={{ fontSize: 20 }}>Delete Account, Edit account ....</Text>
      </View>
      <View style={{ flex: 0.1 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            backgroundColor: "rgba(255,0,0,0.3)",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, fontSize: 20 }}>
            Erase all saved Player Data
          </Text>
          <CustomButton
            title="Erase"
            buttonStyle={{
              backgroundColor: "rgba(255,0,0,0.6)",
              paddingHorizontal: 20,
              borderRadius: 0,
            }}
            onPressOut={onDeleteAllPlayerInfo}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});
