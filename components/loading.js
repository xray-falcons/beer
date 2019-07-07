// Loading.js
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import styles from "../style/styles"

export default class Loading extends React.Component {
  //we check if a user has an account in the firebase
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid)
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
