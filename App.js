import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import SignUpView from "./components/sign-up";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style/styles";
import SignInView from "./components/sign-in";
import { AppNavigator } from "./navigation/navigator";
import { Provider } from "react-redux";
import store from "./redux/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }
  render() {
    return (
        <View style={styles.containerApp}>

          <LinearGradient
            colors={["#c36f09", "#eeba0b"]}
            style={styles.linearGradient}
          >
            <AppNavigator />
          </LinearGradient>
        </View>

    );
  }
}
