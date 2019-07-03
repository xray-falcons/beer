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
import * as Facebook from 'expo-facebook';
import {LinearGradient} from "expo-linear-gradient";


export default class SignInView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email   : '',
            password: '',
        }

    }
    signIn(email, password) {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                console.log(user)
            })
            this.props.navigation.navigate('Dashboard')

        } catch (err) {
            console.log(err)
        }
    }
    async logInWithFacebook() {
        try {
            console.log(4)
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
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
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
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.signIn(this.state.email, this.state.password)}>
                    <Text style={styles.signUpText}>Sign in</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.logInWithFacebook()}>
                    <Text style={styles.signUpText}>Sign in with Facebook</Text>
                </TouchableHighlight>
            </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width: 200,
        height: 35,
        marginBottom:2,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:15,
        height:15,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
        width:200,
        borderRadius:30,
    },
    signupButton: {
        backgroundColor: "#710000",
    },
    signUpText: {
        color: 'white',
    },
    image:{
        width:200,
        height:200,
        marginBottom: 20,
        borderRadius: 100
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        //CHECK DOCS!!!!! cause this could not work on different devices
        // height: 1000
    },
});
