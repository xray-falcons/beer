import React, { Component } from 'react';

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
import firebase from 'firebase';



export default class Test extends Component {
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }
    render(){
        return <View>
            <Text>HELLO TEST</Text>
        </View>
    }
}
