import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Btn from "../Components/Btn";

const HomeScreen = ({ navigation }) => {
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
        <Text style={styles.secondaryText}>AlertNess at your finger Tips</Text>
        <Btn
          title={"Employee Login "}
          onPress={() => {
            navigation.navigate("EmployeeLogin");
          }}
        />
        <Btn
          title={"Authority Login "}
          onPress={() => {
            navigation.navigate("AuthorityLogin");
          }}
        />
        <Btn
          title={"Raise Alarm"}
          onPress={() => {
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
