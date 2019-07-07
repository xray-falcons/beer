import React, { Component } from 'react';
import { View } from 'react-native';
import {db} from "../server/db";
import { LinearGradient } from "expo-linear-gradient";
import {Text, Button} from "react-native-elements";
import styles from "../style/styles"

export default class Random extends Component {
    constructor(props){
        super(props)
        this.state = {
            randomNumber: 0,
            beer: {}
        }
    }
    static navigationOptions = {
        headerTransparent: true
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
                    <Button title="Try random!" buttonStyle={styles.attentionButton} onPress={() => {
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
                <Button title="Try random!" buttonStyle={styles.attentionButton} onPress={() => {
                    this.generateRandomNumber();
                }}
                />
            </View>
            </LinearGradient>)
    }
}
