// Loading.js
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import firebase from "firebase";
import styles from "../style/styles"
import { Audio } from 'expo-av';

export default class Loading extends React.Component {

  async componentDidMount() {
    this.checkIfLoggedIn(); 
    
    try{
        const pourBeerSound = new Audio.Sound()
        await pourBeerSound.loadAsync(require('../sounds/pour_beer.m4a')) 
        await pourBeerSound.playAsync()
    } catch (err){
      console.log(err)
    }
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
