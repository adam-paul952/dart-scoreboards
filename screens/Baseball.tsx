import React from "react";
import { FlatList } from "react-native";
import { Text, View } from "../components/Themed";
import { IPlayer, usePlayerState } from "../context/PlayerContext";

const header = ["Player", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Total"];

const Baseball = () => {
  const { playerList } = usePlayerState();

  React.useEffect(() => {
    console.log(playerList);
  }, []);

  const renderHeader = () => {
    return (
      <View style={{ padding: 10 }}>
        {header.map((text) => {
          return (
            <Text key={text} style={{ textAlign: "center" }}>
              {text}
            </Text>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }: { item: IPlayer }) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
        {item.scoreList.map((score: any) => {
          return <Text>{score}</Text>;
        })}
        <Text style={{ textAlign: "center" }}>
          {item.scoreList.length === 0
            ? 0
            : item.scoreList.reduce((prev, current) => prev + current, 0)}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Scoreboard */}
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        {header.map((text, index) => {
          return (
            <View
              key={text}
              style={[
                text === "Player" || text === "Total"
                  ? { flex: 2 }
                  : { flex: 1 },
                { borderBottomColor: "gray", borderBottomWidth: 1 },
              ]}
            >
              <Text style={{ textAlign: "center" }}>{text}</Text>
            </View>
          );
        })}
      </View>
      {playerList.map((player: IPlayer) => {
        return (
          <View
            key={player.id}
            style={{
              flex: 0.4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginHorizontal: 10,
              // marginLeft: 15,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <Text style={{ flex: 2, paddingLeft: 7 }}>{player.name}</Text>
            {player.scoreList.map((score, index) => {
              return <Text style={{ flex: 1 }}>{score}</Text>;
            })}
          </View>
        );
      })}
      {/* End Scoreboard */}
      <FlatList
        data={playerList}
        // extraData={playerList}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(_, index) => `${index}`}
      />
      <View style={{ flex: 10 }}></View>
    </View>
  );
};

export default Baseball;
