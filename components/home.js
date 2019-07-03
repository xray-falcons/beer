import React, { Component } from 'react';
import firebase from 'firebase';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/styles";

export default class Home extends Component {
	    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <View style={styles1.container}>

            	<View style={styles1.container}>
                	<Text style={styles1.signUpText}>Your recent beers: </Text>
                </View>
                <View>
	                <Text style={styles1.signUpText}>Your favorite beers: </Text>
	            </View>
	            <View>
	                <Text style={styles1.signUpText}>Top picks for you: </Text>
	            </View>
                <Button title='LogOUT' onPress={() => firebase.auth().signOut()}/>

            </View>
            </LinearGradient>
        );
    }
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: 'black',
    }
});
