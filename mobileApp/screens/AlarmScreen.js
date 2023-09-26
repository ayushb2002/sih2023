import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
// import { WebSocket } from "react-native-websocket";
import WS from "react-native-websocket";
import { Component } from "react";
import { AppRegistry } from "react-native";

const AlarmScreen = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  //   useEffect(() => {
  //     // Create a WebSocket connection when the component mounts
  //     const ws = new WebSocket("ws://127.0.0.1:8000/");
  //     setSocket(ws);

  //     ws.onopen = () => {
  //       console.log("WebSocket connection opened.");
  //     };

  //     ws.onmessage = (event) => {
  //       const message = event.data;
  //       console.log("Received message:", message);
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     };

  //     ws.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };

  //     ws.onclose = () => {
  //       console.log("WebSocket connection closed.");
  //     };

  //     // Close the WebSocket connection when the component unmounts
  //     return () => {
  //       if (ws) {
  //         ws.close();
  //       }
  //     };
  //   }, []); // Empty dependency array to run the effect only once (on component mount)

  //   // Function to send data over the WebSocket
  //   const sendData = (data) => {
  //     if (socket && socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify(data));
  //     }
  //   };

  //   return (
  //     <View style={{ flex: 1 }}>
  //       <WS
  //         ref={(ref) => {
  //           this.ws = ref;
  //         }}
  //         url="wss://echo.websocket.org/"
  //         onOpen={() => {
  //           console.log("Open!");
  //           this.ws.send("Hello");
  //         }}
  //         onMessage={console.log}
  //         onError={console.log}
  //         onClose={console.log}
  //         reconnect // Will try to reconnect onClose
  //       />
  //     </View>
  //   );
};

export default AlarmScreen;

// import React, { useState, useEffect } from "react";
// import { SafeAreaView } from "react-native";

// const Home = (props) => {
//   // Initiate socket on screen load
//   useEffect(() => {
//     initiateSocketConnection();
//   }, []);

//   const initiateSocketConnection = () => {
//     // Add URL to the server which will contain the server side setup
//     const ws = new WebSocket(`ws://127.0.0.1:8000/`);

//     // When a connection is made to the server, send the user ID so we can track which
//     // socket belongs to which user
//     ws.onopen = () => {
//       ws.send(
//         JSON.stringify({
//           userId: 20,
//         })
//       );
//     };

//     // Ran when teh app receives a message from the server
//     ws.onmessage = (e) => {
//       const message = JSON.parse(e.data);
//     };
//   };

//   return (
//     <>
//       <SafeAreaView></SafeAreaView>
//     </>
//   );
// };

// export default Home;
