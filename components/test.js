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

    render(){
        return <View style={styles.container}>
            <Text>HELLO TEST</Text>
            <Button title='Sign Out' onPress={() => this.props.navigation.navigate('SignUpScreen')
            }/>
            <Button title='Choose' onPress={() => this.props.navigation.navigate('CategoryScreen')
            }/>
        </View>
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})