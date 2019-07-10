import React, { Component } from "react";
import { ScrollView, Alert, FlatList, View, Text } from 'react-native';
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
            this.props.navigation.navigate('Dashboard');
        } else {
            Alert.alert("We'll need a few more than that to give you a good recommendation ;)")}
        }


        render(){
		const beerTastes = ["sweet", "caramel","hoppy","malt", "light","citrus","sour", "raspberries","fruit", "chocolate","coffee","earthy", "tropical","porter", 'ipa',"roast", "coconut",  "dark", "barley", "crispy","zest","vanilla",  "smooth", "stout", "lemon","smokey", "banana", "oak", "bitter", "bavaria", "grapefruit",  ]
        return(
          <View>
              <Text style={{alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 10
              }}>Your choice: {this.state.userProfile.join(', ')} </Text>
                <FlatList
                    columnWrapperStyle={{alignItems: "center", justifyContent: "center"}}
                    numColumns={4}
                    data={beerTastes}
                    renderItem={({item}) => {
                        return(

                            <Button
                                type="outline"
                                disabledStyle={{backgroundColor: 'grey'}}
                                buttonStyle={{backgroundColor:"#710000",borderRadius: 50, margin: 1, marginBottom: 10, alignItems: "center"}}
                                key={item}
                                title={item}
                                onPress={() => {
                                this.setState({userProfile: [...this.state.userProfile, item]})

                            }}
                            />
                        )}}
                    keyExtractor={(item, index) => index.toString()}
                />
            	<Button
                    type="solid"
                    disabledStyle={{backgroundColor: 'grey'}}
                    buttonStyle={{backgroundColor:"#842749", marginTop: 10, borderRadius: 20}}
                    title="GET STARTED!" onPress={this.submitHandler}/>
          </View>
    )}
}


