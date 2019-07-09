import React, { Component } from "react";
import {Button, ScrollView, Alert} from 'react-native';
import firebase from "firebase";
import { db } from '../server/db';
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles"

export default class UserProfile extends Component{
    constructor() {
        super();
        this.state = {
            userProfile: []
        }
    }

    submitHandler = async()=>{
        const userId = firebase.auth().currentUser.uid
        const userRef = db.doc(`users/${userId}`)
        if (this.state.userProfile.length >=3) {
            console.log(this.state.userProfile)
            await userRef.set({preferences:this.state.userProfile},{merge:true});
            this.setState({userProfile:[]});
        } else {
            Alert.alert("We'll need a few more than that to give you a good recommendation ;)")}
        }

        render(){
		const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <ScrollView>
                {beerTastes.map((elem) =>
                    <Button key={elem} title={elem} onPress={() => {
                    	this.setState({userProfile: [...this.state.userProfile, elem]})
                    }}
                    />
                )}
            	<Button title="submit" onPress={this.submitHandler}/>
            </ScrollView>
            </LinearGradient>
    )}
}
