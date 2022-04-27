import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";

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

export default RatingScreen;