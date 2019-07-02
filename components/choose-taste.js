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



export default class Taste extends Component {


    render(){
        const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy"]

        return <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textBold}>Choose your taste!</Text>
                {beerTastes.map((elem, idx) => {
                    return  <Button key={idx} title={elem = elem[0].toUpperCase() + elem.slice(1)} onPress={() => this.props.navigation.navigate('List', { name : elem}) }/>
                })
                }
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
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


