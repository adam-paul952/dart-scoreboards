import React from "react";

import { StyleSheet } from "react-native";
import { Text, View } from "@components/Themed";

import { possibleOutShots } from "../constants/data/x01OutShots";
import { FlatList } from "react-native-gesture-handler";

const outShotHeader = ["Score", "Dart 1", " Dart 2", "Result"];

const X01OutChart = () => {
  const Item = ({ item }: { item: any }) => {
    if (item.checkOut[0].includes("No Check Out Available")) return null;
    else
      return (
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              borderRightColor: "gray",
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {item.score}
            </Text>
          </View>
          {item.checkOut
            .toString()
            .split(",")
            .map((outshot: any, index: any) => {
              return (
                <View
                  key={outshot[0]}
                  style={{
                    flex: 1,
                    borderRightColor: "gray",
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 20 }}>
                    {outshot}
                  </Text>
                </View>
              );
            })}
        </View>
      );
  };
  return (
    <View>
      {/* Outshot header */}
      <View style={{ flexDirection: "row" }}>
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
                padding: 3,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                {header}
              </Text>
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
        />
      </View>
      {/* end table body */}
    </View>
  );
};

export default X01OutChart;

const styles = StyleSheet.create({});
