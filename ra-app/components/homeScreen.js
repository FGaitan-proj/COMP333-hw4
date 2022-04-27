import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button } from "react-native";



const HomeScreen = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const { loggin, username, password } = route.params;


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/artist/")
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
    }, []);
    

    {(username != "" && !loggin) ? (
      fetch("http://127.0.0.1:8000/api/user/", {method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user': username,
        'password': password
      })})
      .then((response) => response.json())
      .catch((error) => console.error(error))
      ) : null
    }


    const Delete = (song) => {
      fetch("http://127.0.0.1:8000/api/artist/"+{song}, { method: 'DELETE', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
    }
  
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
                <Text>{item.song + " by " + item.artist}  
                <Button
                  style={{ fontSize: 10, color: "blue",}}
                  title="-"
                  onPress={() => Delete(item.song)}
                />
                <Button
                  title="*"
                  onPress={() => navigation.navigate("Add a Rating", { song:  item.song })}
                />
                </Text>
              )}
            />
          </View>
      { loggin ? (
        <View style={{flexDirection:"row",  justifyContent: 'center'}}>
        <Button
        title="+"
        onPress={() => navigation.navigate("Add a Song", { username:  username })}
        />
        </View>
        ) : null }
      </View>
    );
  };
  
export default HomeScreen;  