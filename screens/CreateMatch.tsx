import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "../components/CustomButton";

import { Text, View } from "../components/Themed";

const data = [
  { label: "Baseball", value: "baseball" },
  { label: "Cricket", value: "cricket" },
  { label: "Elimination", value: "elimination" },
  { label: "Killer", value: "killer" },
  { label: "X01", value: "x01" },
];

const CreateMatch = () => {
  const navigation = useNavigation();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const disableButton = () => {
    if (value === null) return true;
    else return false;
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20, paddingLeft: 10 }}>Choose Game:</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View
        style={{ flex: 8, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <CustomButton
          title="Continue to Game"
          buttonStyle={{ marginBottom: 20, width: "80%", alignSelf: "center" }}
          disabled={disableButton()}
          onPressOut={() => {
            value !== null && navigation.navigate(value);
          }}
        />
      </View>
    </View>
  );
};

export default CreateMatch;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "55%",
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 20,
  },
});
