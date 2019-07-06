import React, { Component } from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import * as Facebook from 'expo-facebook';
import {db} from '../server/db'
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles"

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
            email = email.trim().toLowerCase()
            let { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
            await db.collection('users').doc(user.uid).set({email: this.state.email, fullName: this.state.fullName});
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
                //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                this.props.navigation.navigate('Dashboard')

            } else {
                // type === 'cancel'
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
            <View style={styles.container}>
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

                <TouchableHighlight style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.signUp(this.state.email, this.state.password, this.state.fullName)}>
                    <Text style={styles.authText}>Sign up</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.logInWithFacebook()}>
                    <Text style={styles.authText}>Sign up with Facebook</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.authButtonContainer, styles.authButton]} onPress={() => this.props.navigation.navigate('SignInScreen')
                }>
                    <Text style={styles.authText}>Have an account? Sign in</Text>
                </TouchableHighlight>
            </View>
            </LinearGradient>
        );
    }
}
