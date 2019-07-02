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
        const beerTastes = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager", "International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Malternative Beverages"]
        return <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textBold}>Choose your taste!</Text>
                {beerTastes.map((elem, idx) => {
                    return  <Button key={idx} title={elem} onPress={() => this.props.navigation.navigate('BeerList', { name : elem}) }/>
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


