import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    FlatList,
    ScrollView,
    Text,
    Alert
} from 'react-native';
import firebase from "firebase";
import { db } from '../server/db';
import {LinearGradient} from "expo-linear-gradient";


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
		const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <ScrollView>
                {beerTastes.map((elem, idx) =>
                    <Button key={idx} title={elem = elem[0].toUpperCase() + elem.slice(1)} onPress={() => {
                    	this.setState({userProfile: [...this.state.userProfile, elem]})
                    }}
                    />
                )}
            	<Button color="#fff" title="submit" onPress={this.submitHandler}/>
            </ScrollView>
            </LinearGradient>
    )}
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
