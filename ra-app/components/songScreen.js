import React, { useState } from "react";
import { Text, View, Button, TextInput } from "react-native";

const SongScreen = ({ navigation, route }) => {
  const {adding, currentsong, currentartist, currentyear ,currentgenre, 
  loggin , username , password} = route.params;

  const [song, onChangeSong] = useState(currentsong);
  const [artist, onChangeArtist] = useState(currentartist);
  const [year, onChangeYear] = useState(currentyear);
  const [genre, onChangeGenre] = useState(currentgenre);

  const UpdateSong = (song,artist,year,genre) => {
    if (song !== "" && artist !== "" && year !== "" && genre !== "" ) {
        fetch("http://127.0.0.1:8000/api/artist/"+song, {method: 'PATCH',
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

  const AddSong = (song,artist,year,genre) => {
    if (song !== "" && artist !== "" && year !== "" && genre !== "" ) {
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
        // .then((response) => response.json())
        .catch((error) => console.error(error))
    }
    //could add an alert here as the else statement
  }

  const number = (item1) => {
    if (typeof(item1) === 'number') {
      return item1.toString()
    } else {
      return item1
    }
  }


  return (
    <View>
      {(adding) ? (
        <View>
        <Text>Song: </Text>
        <TextInput
        onChangeText={onChangeSong}
        value={song}
      />
        </View>
      ): <Text>Song: {song}</Text>}    
      <Text>Artist: </Text>
      <TextInput
        onChangeText={onChangeArtist}
        value={artist}
      />
      <Text>Year: </Text>
      <TextInput
        onChangeText={onChangeYear}
        value={number(year)}
      />
      <Text>Genre: </Text>
      <TextInput
        onChangeText={onChangeGenre}
        value={genre}
      />
      {(adding) ? (
        <Button
        title="Add"
        onPress={() => {
            AddSong(song,artist,year,genre);
            navigation.push("Home", {
              loggin: loggin, 
              username: username, 
              password: password})
          }}
        />
      ) : (
        <Button
        title="Update"
        onPress={() => {
            UpdateSong(song,artist,year,genre);
            navigation.push("Home", {
              loggin: loggin, 
              username: username, 
              password: password})
          }}
        />
      )}
    </View>
  )
  
};



export default SongScreen;
