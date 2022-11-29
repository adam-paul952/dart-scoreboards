import React, { useCallback } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";

import { IPlayer } from "@context/PlayerContext";
import { Text, View } from "./Themed";
import CustomButton from "./CustomButton";

interface ActivePlayerListProps {
  selectedPlayers: IPlayer[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  togglePlayerSelect: (id: number) => void;
}

const ActivePlayerList = (props: ActivePlayerListProps) => {
  const { selectedPlayers, setSelectedPlayers, togglePlayerSelect } = props;

  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<IPlayer>) => {
      return (
        <View style={{ paddingVertical: 7, width: "80%", alignSelf: "center" }}>
          <SwipeableItem
            key={item.id}
            item={item}
            snapPointsLeft={[100]}
            swipeDamping={5}
            renderUnderlayLeft={() => <UnderlayRight item={item} />}
            activationThreshold={10}
          >
            <CustomButton title={item.name} onPressIn={drag}></CustomButton>
          </SwipeableItem>
        </View>
      );
    },
    []
  );

  const UnderlayRight = ({ item }: { item: IPlayer }) => {
    return (
      <View style={[styles.row, styles.underlayLeft]}>
        <TouchableOpacity
          onPress={() => item.id !== undefined && togglePlayerSelect(item.id)}
        >
          <Text style={styles.text}>Unselect {"\n"} Player?</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        data={selectedPlayers}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        onDragEnd={({ data }) => setSelectedPlayers(data)}
      />
    </GestureHandlerRootView>
  );
};

export default ActivePlayerList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  underlayLeft: {
    borderRadius: 10,
    paddingVertical: 2,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});
