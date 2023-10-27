import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
// import { Button } from "react-native-paper";

const Btn = ({ title, onPress, titleStyle, buttonStyle }) => {
  return (
    <View style={{ margin: 5 }}>
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db", // Background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 16, // Border radius
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    marginBottom: 15,
    elevation: 5,
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16, // Text font size
    fontWeight: "bold", // Text font weight
  },
});

export default Btn;
