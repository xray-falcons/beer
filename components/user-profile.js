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
            await userRef.set({preferences:this.state.userProfile},{merge:true});
            this.setState({userProfile:[]});
            this.props.navigation.navigate("Home")
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
                    <Button key={elem} title={elem = elem[0].toUpperCase() + elem.slice(1)} onPress={() => {
                    	this.setState({userProfile: [...this.state.userProfile, elem]})
                    }}
                    />
                )}
            	<Button color="#fff" title="submit" onPress={this.submitHandler}/>
            </ScrollView>
            </LinearGradient>
    )}
}
