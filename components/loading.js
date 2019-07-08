// Loading.js
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import styles from "../style/styles"

export default class Loading extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Dashboard", {user: user});
      } else {
        this.props.navigation.navigate("Welcome");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Pouring your beer!</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
