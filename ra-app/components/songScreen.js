import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";

const SongScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const [tempsong, setSong] = useState("");

  const [song, onChangeSong] = useState("Enter Song");
  const [artist, onChangeArtist] = useState("Enter Artist");
  const [year, onChangeYear] = useState(null);
  const [genre, onChangeGenre] = useState("Enter Genre");

  const AddSong = (song,artist,year,genre) => {
    if (song !== "" && artist !== "" && year !== "" && genre !== "" ) {
      fetch("http://127.0.0.1:8000/api/artist/"+song)
      .then((response) => response.json())
      .then((json) => setSong(json))
      .catch((error) => console.error(error))
      if (!tempsong) {
        fetch("http://127.0.0.1:8000/api/artist/", {method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'song': song,
          'artist': artist,
          'year': year,
          'genre': genre
        })})
        .then((response) => response.json())
        .catch((error) => console.error(error))
      }
    }

    //could add an alert here as the else statement
  }


  return (
    <View>
      <Text>Song: </Text>
      <TextInput
        onChangeText={onChangeSong}
        value={song}
      />
      <Text>Artist: </Text>
      <TextInput
        onChangeText={onChangeArtist}
        value={artist}
      />
      <Text>Year: </Text>
      <TextInput
        onChangeText={onChangeYear}
        type
        value={year}
      />
      <Text>Genre: </Text>
      <TextInput
        onChangeText={onChangeGenre}
        value={genre}
      />
      <Button
      title="Add"
      onPress={() => 
        {
          AddSong(song,artist,year,genre);
          // navigation.navigate("Home", {loggin: true, username: username})
          navigation.push("Home", {loggin: true, username: username})
        }
      }
      />
    </View>
  )
  
};

export default SongScreen;
