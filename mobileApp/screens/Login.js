import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

// expo add expo-print expo-mail-composer

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your authentication logic here
    if (email === "authority@example.com" && password === "password123") {
      // Authority login successful
      // Navigate to the authority dashboard or perform the appropriate action
      console.log("Authority login successful");
    } else if (email === "employee@example.com" && password === "password456") {
      // Employee login successful
      // Navigate to the employee dashboard or perform the appropriate action
      console.log("Employee login successful");
    } else {
      // Display an error message for invalid credentials
      console.error("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

export default Login;
