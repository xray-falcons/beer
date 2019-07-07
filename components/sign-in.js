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
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles";
import logInWithFacebook from "./facebook-signin";


export default class SignInView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
        }

    }
    static navigationOptions = {
        headerTransparent: true,
        headerTitle: 'Back  to sign-up',
    }

    signIn  = async (email, password) =>  {
        email = email.toLowerCase().trim();
        try {
           await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (err) {
                Alert.alert('Oh no!', "Password or email is incorrect")
            })
        } catch (e) {
            Alert.alert('Oh no!', "Password or email is incorrect")
            console.error("big hu?", e);
        }}

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

                <TouchableHighlight underlayColor='red' style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.signIn(this.state.email, this.state.password)}>
                    <Text style={styles.authText}>Sign in</Text>
                </TouchableHighlight>

                <TouchableHighlight     underlayColor='red'
                                        style={[styles.authButtonContainer, styles.authButton]} onPress={() => logInWithFacebook()}>
                    <Text style={styles.authText}>Sign in with Facebook</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}
