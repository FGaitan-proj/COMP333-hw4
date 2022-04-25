import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artist.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
          </Text>
          <FlatList
            data={data.artist}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.song + ", " + item.artist}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}
