import React, { useRef, useState } from "react";

import { Animated, LayoutAnimation, Pressable } from "react-native";
import { Text, View } from "./Themed";
import RulesDescription from "./RulesDescription";
import { Entypo } from "@expo/vector-icons";

const AccordianItem = ({ item }: { item: any }) => {
  const [expanded, setExpanded] = useState(false);

  const animationControl = useRef(new Animated.Value(0)).current;

  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationControl, config).start();
    LayoutAnimation.configureNext(toggleBodyAnimation);
    setExpanded(!expanded);
  };

  const arrowTransform = animationControl.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const toggleBodyAnimation = {
    duration: 300,
    update: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 300,
      property: LayoutAnimation.Properties.opacity,
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };
  return (
    <View style={{ overflow: "hidden" }}>
      <Pressable onPressOut={() => toggleListItem()}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.game}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <Entypo name="chevron-thin-right" size={24} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      {expanded && <RulesDescription variant={item.game} />}
    </View>
  );
};

export default AccordianItem;
