// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase';

export default class Loading extends React.Component {
    //we check if a user has an account in the firebase
    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('TestScreen')
            } else {
                this.props.navigation.navigate('SignUpScreen')
            }
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading your beer!</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})