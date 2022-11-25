import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { usePlayerState } from "../context/PlayerContext";

import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "../components/Themed";
import CustomButton from "../components/CustomButton";

const initialState = {
  id: 0,
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
  },
};

const CreatePlayer = () => {
  const { onAddPlayer } = usePlayerState();
  const navigation = useNavigation();

  const routes = navigation.getState()?.routes;

  const [playerName, setPlayerName] = useState(initialState);
  const { name } = playerName;

  const addPlayer = () => {
    onAddPlayer(playerName);
    if (routes[routes.length - 2].name === "Root")
      navigation.reset({
        index: 1,
        routes: [{ name: "Root" }, { name: "manage-players" }],
      });
    else navigation.goBack();
  };

  const disableButton = () => (name.length < 3 ? true : false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Name:</Text>
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
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Add Player"
              buttonStyle={styles.buttonStyle}
              onPress={addPlayer}
              disabled={disableButton()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatePlayer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 90,
  },
  inputLabel: { fontSize: 25, paddingBottom: 10 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  buttonStyle: {
    width: "60%",
  },
});
