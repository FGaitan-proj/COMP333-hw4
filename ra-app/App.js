import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artist/")
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
          initialParams={{ data: data, loggin: false, username: "" }}
        />)}
        <Stack.Screen name="Login" component={Login} />
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

  const { data, loggin, username } = route.params;

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/user/")
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => null);
  // }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <View>
          {!loggin ? (<Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          />) : (
            <Button
          title="Sign Out"
          onPress={() => navigation.navigate("Login")}
          />)}
      </View>
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
            Welcome {username}!
          </Text>
          <FlatList
            data={data}
            keyExtractor={({ song }, index) => song}
            renderItem={({ item }) => (
              <Text>{item.song + ". " + item.artist}</Text>
            )}
          />
        </View>
    { loggin ? (
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
      ) : null }
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
    fetch("http://127.0.0.1:8000/api/artist/")
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

const Login = ({ navigation }) => {
  const [text, onChangeText] = useState("Enter Username");
  const templog = (text != "");

  return (
    <View>
      <Text>Username: </Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
      />
      <Text>Password: </Text>
      <TextInput>Enter Password here </TextInput>
      <Button
      title="Login"
      onPress={() => navigation.navigate("Home", {username: text, loggin: templog})}
      />
    </View>
  )
};
