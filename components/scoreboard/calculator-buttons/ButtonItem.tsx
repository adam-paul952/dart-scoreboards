import React from "react";

import { StyleSheet } from "react-native";

import CustomButton from "../../CustomButton";
import {
  AntDesignIcon,
  FeatherIcon,
} from "@components/button-icons/ButtonIcons";
import { Text } from "@components/Themed";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";

interface IButtonItemProps {
  item: string;
  onButtonPress: (inputValue: string) => void;
  disabled?: boolean;
  variant: string;
  hits?: number;
}

const ButtonItem = (props: IButtonItemProps) => {
  const { item, onButtonPress, disabled, variant, hits } = props;

  const colorScheme = useColorScheme();
  const color = Colors[colorScheme].text;

  if (item === "Del") {
    return (
      <CustomButton
        buttonStyle={styles.item}
        buttonChildrenStyle={styles.buttonChildrenStyle}
        buttonIconStyle={styles.buttonIconStyle}
        title={item}
        textStyle={styles.buttonTextStyle}
        onPressOut={() => onButtonPress(item)}
      >
        <FeatherIcon name="delete" size={30} color={color} />
      </CustomButton>
    );
  } else if (item === "Enter") {
    return (
      <CustomButton
        buttonStyle={styles.item}
        buttonChildrenStyle={styles.buttonChildrenStyle}
        buttonIconStyle={styles.buttonIconStyle}
        title={item}
        textStyle={styles.buttonTextStyle}
        onPressOut={() => onButtonPress(item)}
        disabled={disabled}
      >
        <AntDesignIcon name="enter" size={30} color={color} />
      </CustomButton>
    );
  } else {
    if (variant === "cricket") {
      return (
        <CustomButton
          buttonStyle={styles.item}
          title={item}
          onPressOut={() => onButtonPress(item)}
          buttonChildrenStyle={{
            backgroundColor: "transparent",
          }}
          buttonIconStyle={[
            hits === 0
              ? { display: "none" }
              : {
                  display: "flex",
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: -8,
                  right: -36,
                  padding: 2,
                  borderRadius: 30,
                  width: "35%",
                },
          ]}
          disabled={disabled}
        >
          <Text style={{ fontSize: 17, textAlign: "center" }}>x{hits}</Text>
        </CustomButton>
      );
    } else
      return (
        <CustomButton
          buttonStyle={styles.item}
          title={item}
          onPressOut={() => onButtonPress(item)}
        />
      );
  }
};

export default ButtonItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: "33.33%",
    justifyContent: "center",
    borderRadius: 0,
    padding: 10,
    borderWidth: 1.5,
    borderColor: "#fff",
    height: 70,
    alignItems: "center",
  },
  buttonChildrenStyle: {
    backgroundColor: "transparent",
    paddingVertical: 6,
    marginRight: 8,
  },
  buttonIconStyle: {
    backgroundColor: "transparent",
    height: 60,
  },
  buttonTextStyle: { display: "none" },
});
