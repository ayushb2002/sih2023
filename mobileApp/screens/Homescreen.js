import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btn from "../Components/Btn";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        let userDataJson = await AsyncStorage.getItem("user");
        let userDataObj = JSON.parse(userDataJson);
        if (userDataObj["success"] == true)
          navigation.navigate("LoggedInScreen");
      } catch (err) {
        console.log(err);
      }
    }

    checkIfLoggedIn();
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <LinearGradient
        colors={["purple", "lightblue"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          style={styles.imageStyle}
          source={require("../assets/donate.jpg")}
          resizeMode="contain"
        />

        <Text style={styles.mainText}>Suraksha App</Text>

        <Text style={styles.secondaryText}>Disaster Management made easy!</Text>

        <Btn
          title={"Employee Login "}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("EmployeeLogin");
          }}
        />
        <Btn
          title={"Authority Login "}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("AuthorityLogin");
          }}
        />
        <Btn
          title={"Raise Alarm 🚨🚨🚨"}
          titleStyle={{color: "red"}}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("AlarmScreen");
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    height: "40%",
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 20,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 30,
    fontStyle: "italic",
    alignSelf: "center",
    marginBottom: 10,
  },
  secondaryText: {
    fontWeight: "semibold",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 25,
  },
});

export default HomeScreen;
