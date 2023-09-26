import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  AsyncStorage,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import axios from "axios";
import Alarm from "react-native-alarm-manager";
// import { Audio } from "expo-av";
import moment from "moment";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// expo add expo-print expo-mail-composer

const AuthorityLogin = () => {
  const [sound, setSound] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [Sockett, setSockett] = useState(null);
  const [AlarmOn, setAlarmOn] = useState(false);

  var now = new moment().add(5, "seconds");
  console.log(now.format("HH:mm:ss"));
  console.log(now);

  function date_time() {
    var date = new Date();
    var am_pm = "AM";
    var hour = date.getHours();
    if (hour >= 12) {
      am_pm = "PM";
    }
    if (hour == 0) {
      hour = 12;
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }

    var minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    var sec = date.getSeconds();
    if (sec < 10) {
      sec = "0" + sec;
    }

    let datee = hour + ":" + minute + ":" + sec + " " + am_pm;
  }
  // async function playSound() {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../assets/classic-alarm-1.mp3")
  //   );
  //   setSound(sound);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }
  // const date = new Date();
  console.log(toString(now.format("HH:mm:ss")));
  const alarm = {
    alarm_id: 10,
    alarm_time: toString(now.format("HH:mm:ss")), // HH:mm:00
    alarm_title: "ALERT",
    alarm_text: "ALERT",
    alarm_sound: require("../assets/classic-alarm-1.mp3"), // sound.mp3
    alarm_icon: "icon", // icon.png
    alarm_sound_loop: true,
    alarm_vibration: true,
    alarm_noti_removable: true,
    alarm_activate: true,
  };
  const raiseAlarm = (data, send) => {
    console.log(" logic here ");
    Sockett.send(
      JSON.stringify({
        message: " alarm BAJADO RE.... ",
      })
    );
  };

  const connectToSocket = async () => {
    console.log("connectToSocket");
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("userData--> ", userData);
    console.log("userData.city", userData.city);
    console.log('userData["city"]', userData["city"]);
    let soc = new WebSocket(
      `ws://10.0.2.2:8000/ws/alert/${userData["city"]}/${userData["state"]}/`
    );
    /*
{"data": "{\"description\": \"alert ! \", \"location\": \"Latitude: 30.355065 Longitude: 78.0204769\", \"city\": \"DEHRADUN\", \"state\": \"UTTRAKHAND\", \"categories\": []}", "isTrusted": false}
*/
    soc.onopen = (e) => {
      console.log("opened socket ! ", e);
    };

    soc.onmessage = (e) => {
      // got alert from here !
      console.log("on message", e);
      if (!e) return;

      let data = JSON.parse(e.data);
      console.log("data ", data);
      // raiseAlarm();
      // raise alarm !
      // Alarm.schedule(
      //   alarm,
      //   (success) => console.log(success), // success message
      //   (fail) => console.log(fail) // fail message
      // );
      // AlarmOn(true);
      Alert.alert("ALERT !", `${data.description}`, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    };
    // TODO SOME HOW ADD SOUND !
    soc.onerror = (e) => {
      console.log("on error", e);
    };
    await AsyncStorage.setItem("user", JSON.stringify(soc));
    // Connected to ws://127.0.0.1:8000/ws/alert/DEHRADUN/UTTRAKHAND/
    console.log("socket ", soc);
    setSockett(soc);
  };
  const StopAlarm = () => {
    Alarm.stop(
      (success) => console.log(success), // success message
      (fail) => console.log(fail) // fail message
    );
    AlarmOn(false);
  };
  const handleLogin = async () => {
    console.log("email", email);
    console.log("password", password);

    let bodyy = JSON.stringify({
      username: email,
      password: password,
    });

    console.log("bodyy", bodyy);

    axios
      .post(`http://10.0.2.2:8000/alert/loginAuthority`, bodyy)
      .then(async (res) => {
        console.log("result.data ", res.data);
        setUserData(res.data);
        await AsyncStorage.setItem("user", JSON.stringify(res.data));
        // connect to socket
        connectToSocket();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AuthorityLogin</Text>
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
      {AlarmOn && <Button title="Stop Alarm" onPress={StopAlarm} />}
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

export default AuthorityLogin;
