import React from "react";

import { Text, View } from "@components/Themed";
import { ItemProps } from "../X01OutChart";

const ListItem = ({ item }: { item: ItemProps }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        height: 85,
      }}
    >
      <View
        style={{ flex: 0.25, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 20 }}>{item.score}</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        {item.checkOut.map((outshot, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              flex: 1,
              backgroundColor: index % 2 !== 0 ? "lightgray" : "transparent",
              borderLeftWidth: 1,
              borderLeftColor: "lightgray",
              alignItems: "center",
            }}
          >
            {outshot.map((number, index) => {
              const key = (index + 1) * 1000;
              return (
                <Text
                  key={key}
                  style={{
                    fontSize: 20,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {number}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(ListItem);
