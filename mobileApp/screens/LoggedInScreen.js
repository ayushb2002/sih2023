import { View, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import Btn from "../Components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoggedInScreen = ({ navigation }) => {

    const [sockett, setSockett] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function connectToSocket() {
            let userDataJson = await AsyncStorage.getItem("user");
            let userDataObj = JSON.parse(userDataJson);
            let city = String(userDataObj["city"]);
            city = city.replace(/\s/g, "");
            let state = String(userDataObj["state"]);
            state = state.replace(/\s/g, "");
            let socketUrl = encodeURI(`ws://10.0.2.2:8000/ws/alert/${city}/${state}/`);
            let soc = new WebSocket(socketUrl);
            setUserData(userDataObj);

            soc.onopen = (e) => {
                console.log("Connected", e);
            };
        
            soc.onmessage = (e) => {
                console.log("on message", e);
                if (!e) return;
        
                let data = JSON.parse(e.data);
                console.log(data);
                Alert.alert("ALERT !", `Description - ${data.description} \n Location - ${data.location} \n City - ${data.city} \n State - ${data.state} \n Categories - ${data.categories}`, [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }, { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
            };

            soc.onerror = (e) => {
                console.log(e);
            };

            setSockett(soc);
        };

        connectToSocket();
    }, []);
    
    async function calledLogout () {
        try
        {
            await AsyncStorage.removeItem("user");
            sockett.close();
            return true;
        }
        catch (err)
        {
            console.log(err);
            return false;
        }
    }

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
            <Text style={styles.mainText}>Suraksha App</Text>
            <Text style={styles.secondaryText}></Text>
            <Btn
                title={"Raise Alarm"}
                onPress={() => {
                navigation.navigate("AlarmScreen");
                }}
            />
            <Btn
                title={"View raised alarms"}
                onPress={() => {
                navigation.navigate("AuthorityLogin");
                }}
            />
            <Btn
                title={"Logout"}
                onPress={() => {
                    if(calledLogout())
                        navigation.navigate("Home");
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

export default LoggedInScreen;
