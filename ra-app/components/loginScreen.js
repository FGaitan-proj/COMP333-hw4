import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Button, TextInput } from "react-native";


const Login = ({ navigation }) => {
    const [user, onChangeUser] = useState("Enter Username");
    const templog = (user != "");
  
    const [password, onChangePassword] = useState("Enter Password");
  
    return (
      <View>
        <Text>Username: </Text>
        <TextInput
          onChangeText={onChangeUser}
          placeholder={user}
        />
        <Text>Password: </Text>
        <TextInput
          onChangeText={onChangePassword}
          placeholder={password}
        />
        <Button
        title="Login"
        onPress={() => navigation.navigate("Home", {
          username: user, 
          password: password, 
          loggin: templog})}
        />
      </View>
    )
  };


export default Login;