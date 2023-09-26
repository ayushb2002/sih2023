import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import { Button } from "react-native-paper";

const Btn = ({ title, onPress }) => {
  return (
    <View style={{ margin: 5 }}>
      {/* <Button> */}
      {/* </Button> */}
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db", // Background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 8, // Border radius
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Text font size
    fontWeight: "bold", // Text font weight
  },
});

export default Btn;
