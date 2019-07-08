import React from "react";
import {  View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style/styles";
import { AppNavigator } from "./navigation/navigator";
import "./components/fix-android-bugs";


const App = () => {
    return (
        <View style={styles.containerApp}>
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                {Platform.OS === 'ios'}
                <AppNavigator />
            </LinearGradient>
        </View>
    );
};

export default App;
