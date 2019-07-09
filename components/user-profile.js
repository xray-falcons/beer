import React, { Component } from "react";
import { ScrollView, Alert, FlatList, View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from "firebase";
import { db } from '../server/db';

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
		const beerTastes = ["sweet", "chocolate", "caramel","hoppy", "porter", "light","citrus","sour","spicy", "fruit","coffee","earthy", "tropical", "roast", "coconut",  "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]
        return(
          <View>
                <FlatList
                    numColumns={4}
                    data={beerTastes}
                    renderItem={({item}) => {
                        return(
                            <Button key={item}
                                    title={item}
                                    type="solid"
                                    onPress={() => {
                                this.setState({userProfile: [...this.state.userProfile, item]})
                            }}
                            />
                        )}}
                    keyExtractor={(item, index) => index.toString()}
                />
            	<Button title="submit" onPress={this.submitHandler}/>
          </View>
    )}
}
