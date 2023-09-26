import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import axios from "axios";
// const baseUrl = 'https://reqres.in';
// expo add expo-print expo-mail-composer

const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data } = await axios.post(
      "/http://127.0.0.1:8000/alert/loginEmployee",
      {
        username: email,
        password,
      }
    );
    console.log("data in employee login ", data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmployeeLogin</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default EmployeeLogin;
