import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";

const EmployeeLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try
    {
      const { data } = await axios.post("http://10.0.2.2:8000/alert/loginEmployee",
        {
          "username": email,
          "password": password,
        }
      );
      await AsyncStorage.setItem("user", JSON.stringify(data));
      navigation.navigate("LoggedInScreen");
    }
    catch (err)
    {
      console.log(err);
    }
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

export default EmployeeLogin;
