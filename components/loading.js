// Loading.js
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "firebase";

export default class Loading extends React.Component {
  //we check if a user has an account in the firebase
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user)
        this.props.navigation.navigate("Dashboard");
      } else {
        this.props.navigation.navigate("Welcome");
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Loading your beer!</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
