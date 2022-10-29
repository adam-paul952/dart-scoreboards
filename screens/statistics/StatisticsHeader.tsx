import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

export interface StatisticsHeaderProps {
  variant: string;
}

const overallHeader = ["Name", "GP", "GW", "GL", "Win %"];
const baseballHeader = ["Name", "GP", "GW", "GL", "Win %", "HS"];

const StatisticsHeader = (props: StatisticsHeaderProps) => {
  const { variant } = props;

  let header: string[] = [];

  if (variant === "baseball") header = baseballHeader;
  else if (variant === "overall") header = overallHeader;

  return (
    <>
      {header.map((item) => {
        return (
          <View key={item} style={{ flex: 1, alignItems: "center" }}>
            <Text>{item}</Text>
          </View>
        );
      })}
    </>
  );
};

export default StatisticsHeader;

const styles = StyleSheet.create({});
