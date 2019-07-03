import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert, ScrollView
} from 'react-native';
import firebase from 'firebase';
import { db } from '../server/db';
import BeerList from './beer-list';
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/styles";

export default class Category extends Component {

    static navigationOptions = {
        header: null
    }
    render(){
        const beerStyles = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager", "International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Malternative Beverages"]
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <View style={styles1.container}>
            <ScrollView>
            {beerStyles.map((elem, idx) => {
            return  <Button key={idx} title={elem} onPress={() => this.props.navigation.navigate('List', { name : elem}) }/>
            })
            }
            </ScrollView>
        </View>

            </LinearGradient>)
    }
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    textBold:{
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center'
      }
})


