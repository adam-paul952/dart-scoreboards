import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IPlayer, usePlayerState } from "@context/PlayerContext";
import useSqlite from "../hooks/useSqlite";

import { Text, View } from "@components/Themed";
import PlayerItem from "@components/PlayerItem";
import CustomButton from "@components/CustomButton";

const ManagePlayerScreen = () => {
  const { playerList, onDeletePlayer, togglePlayerSelect } = usePlayerState();
  const { updateSelectedPlayerlist } = useSqlite();
  const navigation = useNavigation();

  const disableButton = () => {
    const selected = playerList.filter(
      (player) => player.selected === true
    ).length;
    if (selected > 1) return false;
    else return true;
  };

  const onHandleContinue = () => {
    playerList.forEach((player) => {
      let selected;
      if (player.selected === true) selected = 1;
      else selected = 0;
      updateSelectedPlayerlist({ selected, id: player.id });
    });
    navigation.navigate("create-match");
  };

  const renderItem = ({ item }: { item: IPlayer }) => {
    return (
      <PlayerItem
        player={item}
        togglePlayerSelect={togglePlayerSelect}
        deletePlayer={onDeletePlayer}
      />
    );
  };

  const ListEmpty = () => {
    return (
      <Text style={{ fontSize: 22 }}>
        No players added -- {"\n"}Please add players to continue
      </Text>
    );
  };

  return (
    <View
      style={[
        styles.container,
        playerList.length === 0
          ? styles.emptyListContainer
          : styles.filledListContainer,
      ]}
    >
      <>
        <FlatList
          data={playerList}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={ListEmpty}
        />
        <CustomButton
          title="Continue to Game"
          buttonStyle={styles.buttonStyle}
          disabled={disableButton()}
          onPressOut={onHandleContinue}
        />
      </>
    </View>
  );
};

export default ManagePlayerScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyListContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "50%",
  },
  filledListContainer: { paddingTop: 20 },
  buttonStyle: {
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});
