import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";
import { styles } from "../styles";


const Login = ({ navigation }) => {
    const [user, onChangeUser] = useState("Enter Username");
    const [password, onChangePassword] = useState("Enter Password");

    const register = (username, password) => {
      {(username != "" && password != "") ? (
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
    }
  
    return (
      <View>
        <Text>Username: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUser}
          placeholder={user}
        />
        <Text>Password: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder={password}
        />
        <Button
        title="Login"
        onPress={() => {
          register(user,password);
          navigation.navigate("Home", {
            username: user, 
            password: password, 
            loggin: true})

        }}
        />
      </View>
    )
  };


export default Login;