import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";
import Btn from "../Components/Btn";

const EmployeeLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://10.0.2.2:8000/alert/loginEmployee",
        {
          username: email,
          password: password,
        }
      );
      await AsyncStorage.setItem("user", JSON.stringify(data));
      navigation.navigate("LoggedInScreen");
    } catch (err) {
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
        style={styles.email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.email}
      />

      <Btn title="LOGIN" onPress={handleLogin} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: 20,
    paddingTop: "30%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: "20%",
  },
  email: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 30,
    paddingLeft: 8,
    borderRadius: 10
  },
  button: {},
});

export default EmployeeLogin;
