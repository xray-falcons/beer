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
import {db} from "../server/db";
import Beer from "./beer";
import { LinearGradient } from "expo-linear-gradient";



export default class Random extends Component {
    constructor(props){
        super(props)

        this.state = {
            randomNumber: 0,
            beer: {}
        }
    }



    generateRandomNumber = async () => {

        let RandomNumber = Math.floor(Math.random() * (200-100+1)) + 100 ;

        this.setState({

            randomNumber : RandomNumber

        })
        try {
            let docRef = await db.collection("beers").doc(RandomNumber.toString());
            let beer = await docRef.get()
            if (beer.exists) {
                console.log(beer.data())
                this.state.beer = beer.data()
                this.state.randomNumber = 0

                console.log('BBEEER', this.state.beer)
                this.props.navigation.navigate('Beer',
                    {beer: this.state.beer})

            } else {
                console.log("No such document!");
            }
        } catch (err)  {
            console.log(err)
        }
    }

    render(){
            return (<LinearGradient
                    colors={["#c36f09", "#eeba0b"]}
                    style={styles.linearGradient}
                ><View style={styles.container}>
                <Button title={'Try random!'} onPress={() => {
                    this.generateRandomNumber();
                    console.log("BUTTTON", this.state.beer)
                }}
                />
            </View>
            </LinearGradient>)

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
    },
})
