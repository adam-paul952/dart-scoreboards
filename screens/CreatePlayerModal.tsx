import React, { useEffect, useState } from "react";

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

import window from "../constants/Layout";
const height = window.window.height;

import { usePlayerState } from "../context/PlayerContext";

const CreatePlayerModal = () => {
  const initialState = {
    id: Math.floor(Math.random() * 10000),
    name: "",
    score: 0,
    scoreList: [],
    lives: 0,
    selected: true,
  };
  const { onAddPlayer } = usePlayerState();
  const navigation = useNavigation();

  const [playerName, setPlayerName] = useState(initialState);
  const { name } = playerName;

  const addPlayer = () => {
    onAddPlayer(playerName);

    navigation.goBack();
  };

  useEffect(() => {
    console.log(playerName);
  }, [playerName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              // height: height / 3.5,
              // alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 90,
            }}
          >
            <Text style={{ fontSize: 25, paddingBottom: 10 }}>
              Enter Playername:
            </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) =>
                setPlayerName({ ...playerName, name: text })
              }
              keyboardType="default"
              onSubmitEditing={addPlayer}
              autoCapitalize="words"
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
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatePlayerModal;

const styles = StyleSheet.create({
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    // backgroundColor: "white",
  },
});
