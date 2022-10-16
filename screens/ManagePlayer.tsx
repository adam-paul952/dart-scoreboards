import React from "react";

import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";
import PlayerItem from "@components/PlayerItem";
import { IPlayer, usePlayerState } from "@context/PlayerContext";
import CustomButton from "@components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ManagePlayerScreen = () => {
  const { playerList, setPlayerList, onDeletePlayer, setSelectedPlayers } =
    usePlayerState();
  const navigation = useNavigation();

  const togglePlayerSelect = (id: number) => {
    setPlayerList(() =>
      playerList.map((player: IPlayer) => {
        if (player.id === id) {
          player.selected = !player.selected;
        }
        return player;
      })
    );
    setSelectedPlayers((prev: IPlayer[]) =>
      prev.filter((player) => {
        if (player.selected === true) return player;
      })
    );
  };

  const disableButton = () => {
    const selected = playerList.filter(
      (player: IPlayer) => player.selected === true
    ).length;
    if (selected > 1) return false;
    else return true;
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
          onPressOut={() => {
            navigation.navigate("create-match");
          }}
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
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});
