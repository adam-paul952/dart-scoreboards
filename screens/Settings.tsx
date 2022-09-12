import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

const UserSettings = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.5,
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
    </View>
  );
};

export default UserSettings;

const styles = StyleSheet.create({});
