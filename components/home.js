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

export default class Home extends Component {
	    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
            	<View style={styles.container}>
                	<Text style={styles.signUpText}>Your recent beers: </Text>
                </View>
                <View>
	                <Text style={styles.signUpText}>Your favorite beers: </Text>
	            </View>
	            <View>
	                <Text style={styles.signUpText}>Top picks for you: </Text>
	            </View>
                <Button title='LogOUT' onPress={() => firebase.auth().signOut()}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
    }
});
