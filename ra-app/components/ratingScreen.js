import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";

const RatingScreen = ({ navigation, route }) => {
  const { song, username, password } = route.params;
  const [data, setData] = useState([]);
  const [rate, setRate] = useState(null);
  const [key, setID] = useState(null);
  const [adding, setAdd] = useState(true);
  const [description, setDesc] = useState("Enter Description");

  const setting = (data) => {
    for (const item in data) {
      if (item.user === username && item.song === song) {
        setAdd(false)
        setID(item.id)
        console.log(item)
      }
    }
    setData(data);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rating/")
      .then((response) => response.json())
      .then((json) => setting(json))
      .catch((error) => console.error(error))
      .finally(() => null);
  }, []);

  const restrict = (num) => {
    let n = num
    if (num > 5) {
      n = 5
    } else if (num < 1) {
      n = 1
    }
    setRate(n)
  }
  
  const UpdateRate = (id, user,tempsong,rating,description) => {
    if (user !== "" && tempsong !== "" && rating !== "" && description !== "" ) {
        fetch("http://127.0.0.1:8000/api/rating/"+id, {method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user": user,
          "song": tempsong,
          "rating": rating,
          "description": description
        })})
        .then((response) => response.json())
        .catch((error) => console.error(error))
    }
  }

  const AddRate = (user,tempsong,rating,description) => {
    if (user !== "" && tempsong !== "" && rating !== "" && description !== "" ) {
        fetch("http://127.0.0.1:8000/api/rating/", {method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user": user,
          "song": tempsong,
          "rating": rating,
          "description": description
        })})
        // .then((response) => response.json())
        .catch((error) => console.error(error))
    }
    //could add an alert here as the else statement
  }


  return (
    <View>
      <Text style={{ fontSize: 18,
              color: "green",
              textAlign: "center",}}>Ratings for Song: 
        {song}</Text>
      <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            (item.song === song) ? (<Text> * {item.rating}: {item.user} says {item.description}</Text>): null
          )}
      />

      <Text style={{ fontSize: 18, color: "red", textAlign: "center",}}> 
      {adding ? ("Add"):"Edit"} Your Rating Here</Text>
      <Text style={{ fontSize: 14, color: "red", textAlign: "center",}}>
        User: {username}</Text>
      
      <TextInput
        onChangeText={setDesc}
        placeholder={description}
      />
      <TextInput
        onChangeText={restrict}
        placeholder="Enter Rate 1-5"
        keyboardType="numeric"
        maxLength={1}
      />
      <Button
      title={adding ? ("Add"):"Edit"}
      onPress={() => {
        {adding ? (AddRate(username,song,rate,description)): UpdateRate(key,username,song,rate,description)}
        navigation.navigate("Home", {loggin: true, username: username, password: password})}}
      />
    </View>
  )
};

export default RatingScreen;