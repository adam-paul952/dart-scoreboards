import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Dropdown as DefaultDropdown } from "react-native-element-dropdown";

import { Text, View } from "../components/Themed";

const Dropdown = ({
  data,
  label,
  value,
  setValue,
}: {
  data: { label: string; value: string }[];
  label: string;
  value: string | null | [screen: string] | number;
  setValue:
    | React.Dispatch<React.SetStateAction<null>>
    | React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.dropdownRow}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <DefaultDropdown
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
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownRow: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownLabel: { fontSize: 20, paddingLeft: 10 },
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
