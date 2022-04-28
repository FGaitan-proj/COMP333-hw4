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
        fetch("http://127.0.0.1:8000/api/artist/"+song, { method: 'DELETE', 
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }})
        .catch((error) => console.error(error))

    }


    const ReloadData = () => {
        fetch("http://127.0.0.1:8000/api/artist/")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
    }


    return (
        <View style={{ flex: 1, padding: 24 }}>
        <View>
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
            <Button
            title={!loggin ? ("Login") : ("Sign Out")}
            onPress={() => navigation.navigate("Login")}
            />
        </View>
            <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            >
            <FlatList
                data={data}
                keyExtractor={({ song }, index) => song}
                renderItem={({ item }) => (
                <Text>{item.song + " by " + item.artist + " from " + item.year}  
                <Button
                    style={{ fontSize: 5, color: "blue",}}
                    title="-"
                    onPress={() => {
                        Delete(item.song);
                        navigation.push('Home', 
                                {username: username, 
                                password: password})}}
                />
                <Button
                    title="*"
                    onPress={() => 
                    navigation.push("Add a Song", { adding: false, 
                    loggin: loggin, username: username, password: password,
                    currentsong: item.song, currentartist: item.artist, 
                    currentyear: item.year, currentgenre: item.genre})}
                />
                { loggin ? (
                <Button
                    style={{ fontSize: 2, color: "blue",}}
                    title="rate"
                    onPress={() => 
                    navigation.push("Add a Rating", {
                        username: username, 
                        password: password,
                        song: item.song})}
                />
                ):null}
                </Text>
                )}
            />
            </View>
        <View style={{flexDirection:"row",  justifyContent: 'center'}}>
        <Button
        title="+"
        onPress={() => navigation.push("Add a Song", {
            adding:  true, 
            loggin: loggin, 
            username: username, 
            password: password})}
        />
        </View>
        </View>
    );
  };
  
export default HomeScreen;  