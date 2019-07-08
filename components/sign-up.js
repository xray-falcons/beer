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
import {db} from '../server/db'
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles";
import logInWithFacebook from "./facebook-signin";

export default class SignUpView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email   : '',
            password: '',
            age: false
        }
    }
    static navigationOptions = {
        header: null
    }

    signUp = async (email, password, fullName) => {
        if (this.state.password.length < 5) {
            Alert.alert('Password is invalid', 'Password must be longer than 6 characters')
            return;
        }
        if (this.state.fullName === '') {
            Alert.alert('Full name', 'Please type your full name')
            return;
        }
        try {
            email = email.trim().toLowerCase();
            fullName = fullName.trim();
            let { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await db.collection('users').doc(user.uid).set({email: email, fullName: fullName});
            this.props.navigation.navigate('Preferences')
        } catch (err) {
            console.log(err)
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
                    <Image style={styles.authInputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.authInputs}
                               placeholder="Full name"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(fullName) =>  this.setState({fullName})}/>
                </View>
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
                <TouchableHighlight underlayColor='red' style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.signUp(this.state.email, this.state.password, this.state.fullName)}>
                    <Text style={styles.authText}>Sign up</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='red' style={[styles.authButtonContainer, styles.authButton]} onPress={() => logInWithFacebook()}>
                    <Text style={styles.authText}>Sign up with Facebook</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='red' style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.props.navigation.navigate('SignInScreen')
                }>
                    <Text style={styles.authText}>Have an account? Sign in</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}
