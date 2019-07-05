import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';
import {db} from "../server/db";
import Beer from "./beer";
import { LinearGradient } from "expo-linear-gradient";
import {Text} from "react-native-elements";

export default class Random extends Component {
    constructor(props){
        super(props)
        this.state = {
            randomNumber: 0,
            beer: {}
        }
    }
    static navigationOptions = {
        header: null
    }
    generateRandomNumber = async () => {
        let RandomNumber = Math.floor(Math.random() * (300-100+1)) + 100 ;
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
                this.props.navigation.navigate('Beer',
                    {beer: this.state.beer})
            } else {
                this.generateRandomNumber();
            }
        } catch (err)  {
            console.log(err)
        }
    }
    render(){
        if (this.props.navigation.getParam('name') === 'Search') {
            return (<LinearGradient
                    colors={["#c36f09", "#eeba0b"]}
                    style={styles.linearGradient}
                ><View style={styles.container}>
                    <Text>Sorry, we did not find your beer... But maybe you feel lucky?</Text>
                    <Button title={'Try random!'} onPress={() => {
                        this.generateRandomNumber();
                    }}
                    />
                </View>
                </LinearGradient>
            )
        }
            return (<LinearGradient
                    colors={["#c36f09", "#eeba0b"]}
                    style={styles.linearGradient}
                ><View style={styles.container}>
                <Button title={'Try random!'} onPress={() => {
                    this.generateRandomNumber();
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
