import React, { Component } from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import {signUpThunk} from "../redux";


export default class SignUpView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email   : '',
            password: '',
        }
    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }

    signUp = (email, password) => {
        console.log(5)
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(email, password)

        } catch (err) {
            console.log(err)
        }

        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(this.state.email, this.state.password)
        //     .then(() => this.props.navigation.navigate('Test'))
        //     .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../style/StumblrLogo.png')} style={styles.image}
            />
                <View style={styles.inputContainer}>

                    <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                    <TextInput style={styles.inputs}
                               placeholder="Full name"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(fullName) =>  this.setState({fullName})}/>
                </View>

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

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.signUp(this.state.email, this.state.password)}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                    <Text style={styles.signUpText}>Sign up with Google</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                    <Text style={styles.signUpText}>Sign up with Facebook</Text>
                </TouchableHighlight>
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
});
// const mapStateToProps = (state) => {
//     let user = state.user;
//     return { user };
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
//         signUp: (newUser, password) => dispatch(signUpThunk(newUser, password))
//     }
// };
// export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
