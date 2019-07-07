import React, { Component } from 'react';
import styles from "../style/styles"
import {
    Text,
    View,
    Button
} from 'react-native';



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
