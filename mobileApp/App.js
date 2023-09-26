import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/Homescreen";
import EmployeeLogin from "./screens/EmployeeLogin";
import AuthorityLogin from "./screens/AuthorityLogin";
import AlarmScreen from "./screens/AlarmScreen";
import Login from "./screens/Login";
import LoggedInScreen from "./screens/LoggedInScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <Stack.Screen name="AuthorityLogin" component={AuthorityLogin} />
        <Stack.Screen name="AlarmScreen" component={AlarmScreen} />
        <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
