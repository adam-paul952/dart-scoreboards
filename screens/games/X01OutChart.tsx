import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Text, View } from "@components/Themed";
import ListItem from "./x01OutChartComponents/ListItem";

import { possibleOutShots } from "../../constants/data/x01OutShots";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

type X01OutChartProps = NativeStackScreenProps<
  RootStackParamList,
  "x01-outchart"
>;

export interface ItemProps {
  score: number;
  checkOut: string[][];
}

const outShotHeader = ["Score", "Dart 1", " Dart 2", "Dart 3"];

const keyExtractor = (item: ItemProps, index: number) => `score-${index}`;

const getItemLayout = (data: any, index: number) => ({
  length: 85,
  offset: (85 + 1.05) * index,
  index,
});

const renderItem = ({ item }: { item: ItemProps }) => <ListItem item={item} />;

const X01OutChart = ({ route }: X01OutChartProps) => {
  const { currentPlayerScore } = route.params;

  let dataArray = possibleOutShots.filter(
    (item) => item.checkOut[0][0] !== "No Check Out"
  );

  currentPlayerScore !== undefined
    ? (dataArray = dataArray.filter((item) => item.score <= currentPlayerScore))
    : (dataArray = dataArray);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeperator}
        ListHeaderComponent={ListHeader}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={10}
        initialNumToRender={30}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default X01OutChart;

const ListHeader = () => (
  <View
    style={{
      flex: 1,
      borderRightColor: "gray",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      paddingVertical: 3,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-around",
    }}
  >
    {outShotHeader.map((header) => (
      <Text key={header} style={{ fontSize: 20 }}>
        {header}
      </Text>
    ))}
  </View>
);

const ItemSeperator = () => (
  <View
    style={{
      margin: 1,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
      marginVertical: 5,
    }}
  />
);

const styles = StyleSheet.create({});
