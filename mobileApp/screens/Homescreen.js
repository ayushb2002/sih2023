import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btn from "../Components/Btn";
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    async function checkIfLoggedIn() {
      try{
        let userDataJson = await AsyncStorage.getItem("user");
        let userDataObj = JSON.parse(userDataJson);
        if(userDataObj["success"] == true)
          navigation.navigate("LoggedInScreen")
      }
      catch(err)
      {
        console.log(err)
      }
    }

    checkIfLoggedIn();
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearGradient
        colors={["purple", "white"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image
          style={styles.imageStyle}
          source={require("../assets/donate.jpg")}
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
          title={"Raise Alarm"}
          onPress={(e) => {
            e.preventDefault();
            navigation.navigate("AlarmScreen");
          }}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
  },
  secondaryText: {
    fontWeight: "semibold",
    fontSize: 20,
    alignSelf: "center",
  },
});

export default HomeScreen;
