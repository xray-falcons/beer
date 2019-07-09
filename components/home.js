import React from 'react';
import {Text, View} from 'react-native';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"
import Frequent from "./frequent-beers"
import Recent from "./recent-beers"

export default class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            recommendedBeers: [],
            userId: ''
        }
    }
    static navigationOptions = {
        headerTransparent: true,
        headerTitle: "",
        headerRight: (
            <Button type="solid" buttonStyle={styles.attentionButton} title='Logout' onPress={() => firebase.auth().signOut()}/>
        ),
    };

    async componentWillMount () {
        const userId = await firebase.auth().currentUser.uid
        this.setState({userId: userId})
        //this.getRecommendations()
    }


    // getRecommendations = async () => {
    //     const recommendedBeers = []
    //     try {
    //         const beers = await db.collection('beers')
    //         const userQuery = await db.doc(`users/${this.state.userId}`).get()
    //         const preferences = userQuery.data().preferences.map(elem => elem.toLowerCase())
    //         for (let i = 0; i < preferences.length; i++){
    //             const beerQuery = beers
    //                 .where('taste', 'array-contains', preferences[i])
    //                 .limit(2)
    //             const querySnapshot = await beerQuery.get()
    //             querySnapshot.forEach(function(doc){
    //                 let beer = doc.data()
    //                 recommendedBeers.push(beer)
    //             })
    //         }
    //         this.setState({recommendedBeers})
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }


    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        <ScrollView>
                            <Recent navigation={this.props.navigation} />
                            <Frequent navigation={this.props.navigation}/>
                            <View style={{marginTop: 10, justifyContent: "space-between"}}>
                                <Text style={styles.titleText}>Top picks for you: </Text>
                                <View style={{justifyContent: "space-between", marginTop: 15}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recommendedBeers.length ? this.state.recommendedBeers.map((eachBeer, idx) =>
                                        <Beer key={idx} beer={eachBeer} navigation={this.props.navigation} />) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                                <Button onPress={this.getRecommendations} title="Get New Recommendations" />
                                </View>
                            </View>
                        </ScrollView>
            </LinearGradient>
        );
    }
}



