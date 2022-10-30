import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "@components/Themed";

export interface StatisticsHeaderProps {
  variant: string;
}

const overallHeader = ["Name", "GP", "GW", "GL", "Win %"];
const baseballHeader = ["Name", "GP", "GW", "GL", "Win %", "HS"];
const x01Header = ["Name", "GP", "GW", "GL", "Win %", "HS", "1DaAvg"];

const StatisticsHeader = (props: StatisticsHeaderProps) => {
  const { variant } = props;

  let header: string[] = [];

  if (
    variant === "baseball" ||
    variant === "cricket" ||
    variant === "elimination" ||
    variant === "killer"
  )
    header = baseballHeader;
  else if (variant === "x01") header = x01Header;
  else header = overallHeader;

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
