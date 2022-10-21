import React, { useState } from "react";

import { Keyboard, Platform, StyleSheet } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "../components/Themed";
import CustomButton from "../components/CustomButton";

import { usePlayerState } from "../context/PlayerContext";

const CreatePlayer = () => {
  const initialState = {
    // id: Math.floor(Math.random() * 10000),
    name: "",
    score: 0,
    scoreList: [],
    lives: 0,
    killer: false,
    selected: true,
    stats: {
      highScore: 0,
      oneDartAverage: 0,
      darts: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
    },
  };
  const { onAddPlayer } = usePlayerState();
  const navigation = useNavigation();

  const [playerName, setPlayerName] = useState(initialState);
  const { name } = playerName;

  const addPlayer = () => {
    onAddPlayer(playerName);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 90,
            }}
          >
            <Text style={{ fontSize: 25, paddingBottom: 10 }}>Enter Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) =>
                setPlayerName({ ...playerName, name: text })
              }
              keyboardType="default"
              onSubmitEditing={addPlayer}
              autoCapitalize="words"
              autoFocus
              placeholder="Player name"
            />
            <View
              style={{
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <CustomButton
                title="Add Player"
                buttonStyle={{
                  width: "60%",
                  backgroundColor: "lightblue",
                }}
                onPress={() => addPlayer()}
                disabled={name.length < 3 ? true : false}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatePlayer;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
