import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://sebastianzimmeck.de/class/comp333/test-api.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* As long as isLoading is true, show "Loading ..." */}
      {isLoading ? (
        <Stack.Screen name="Load"
        component={LoadScreen} />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Listener" }}
          initialParams={{ data: data }}
        />)}
        <Stack.Screen name="Add a Song" component={SongScreen} />
        <Stack.Screen name="Add a Rating" component={RatingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoadScreen = () => {
  return <Text>Loading...</Text>
}

const HomeScreen = ({ navigation, route }) => {

  const { data } = route.params;

  return (
    <View style={{ flex: 1, padding: 24 }}>
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
            data={data.lectures}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.id + ". " + item.title}</Text>
            )}
          />
        </View>
      <View style={{flexDirection:"row",  justifyContent: 'center'}}>
      <Button
      title="+"
      onPress={() => navigation.navigate("Add a Song", { name:  'Jane' })}
      />
      <Button
      title="*"
      onPress={() => navigation.navigate("Add a Rating", { name:  'Tyler' })}
      />
      </View>
    </View>
  );
};

const SongScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
      title="Add"
      onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
  
};

const RatingScreen = ({ navigation, route }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://sebastianzimmeck.de/class/comp333/test-api.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => null);
  }, []);


  return (
    <View>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
      title="Add"
      onPress={() => navigation.navigate("Home", {data: data})}
      />
    </View>
  )
};
