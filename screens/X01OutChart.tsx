import React from "react";

import { StyleSheet } from "react-native";
import { Text, View } from "@components/Themed";

import { possibleOutShots } from "../constants/data/x01OutShots";
import { FlatList } from "react-native-gesture-handler";

const outShotHeader = ["Score", "Dart 1", " Dart 2", "Dart 3"];

const X01OutChart = () => {
  const Item = ({ item }: { item: any }) => {
    return (
      <>
        {item.checkOut.map((outshot: any, index: any) => {
          if (outshot.includes("No Check Out")) return null;
          else
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: "gray",
                    paddingHorizontal: 1,
                    paddingVertical: 3,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{item.score}</Text>
                </View>
                {outshot.map((number: any, index: any) => {
                  const key = (index + 1) * 1000;
                  return (
                    <View key={key} style={{ flex: 1, alignItems: "center" }}>
                      <Text style={{ fontSize: 20 }}>{number}</Text>
                    </View>
                  );
                })}
              </View>
            );
        })}
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Outshot header */}
      <View style={{ flexDirection: "row", paddingLeft: 3 }}>
        {outShotHeader.map((header) => {
          return (
            <View
              key={header}
              style={{
                flex: 1,
                borderRightColor: "gray",
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                paddingVertical: 3,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>{header}</Text>
            </View>
          );
        })}
      </View>
      {/* end header */}
      {/* Table body */}
      <View>
        <FlatList
          data={possibleOutShots}
          renderItem={Item}
          keyExtractor={(item) => item.score.toString()}
          maxToRenderPerBatch={30}
          updateCellsBatchingPeriod={75}
          initialNumToRender={30}
        />
      </View>
      {/* end table body */}
    </View>
  );
};

export default X01OutChart;

const styles = StyleSheet.create({});

// TODO: List needs to be further optimized
