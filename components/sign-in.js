import React, { Component } from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import * as Facebook from 'expo-facebook';
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles"


export default class SignInView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
        }

    }
    static navigationOptions = {
        header: null
    }

    signIn(email, password) {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
            this.props.navigation.navigate('Dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    async logInWithFacebook() {
        try {
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync('463520067716247', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                this.props.navigation.navigate('Dashboard')

            } else {
                // type === 'cancel'
                Alert.alert('Oops!', 'Something went wrong...');

            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <KeyboardAvoidingView style={styles.container}
                behavior="padding">

                <Image source={require('../style/StumblrLogo.png')} style={styles.image}
                />
                <View style={styles.authInputContainer}>
                    <Image style={styles.authInputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.authInputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.authInputContainer}>
                    <Image style={styles.authInputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.authInputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.signIn(this.state.email, this.state.password)}>
                    <Text style={styles.authText}>Sign in</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.logInWithFacebook()}>
                    <Text style={styles.authText}>Sign in with Facebook</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}
