import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert, Category
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../style/styles';
import Beer from "./beer"

export default class Home extends Component {

    constructor(){
        super()
        this.state = {
            recentBeers: [],
            frequentBeers: [],
            recommendedBeers: []
        }
    }
    //TODO: COMPONENTS DONT UPDATE! SHOULD WE USE componentDidUpdate()?
    componentDidMount(){
        this.getFrequentBeers()
        this.getRecentBeers()
        this.getRecommendations()
    }

    getFrequentBeers = async () => {
        const userId = firebase.auth().currentUser.uid
        const userBeersRef = db.collection(`users/${userId}/beers`)
        try {
            let frequentBeers = []
            const query = userBeersRef.orderBy("times", "desc").limit(3)
            const querySnapshot = await query.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                frequentBeers.push(beer)
            })
            this.setState({frequentBeers})
        } catch(err) {
            console.err(err)
        }
    }

    getRecentBeers = async () => {
        const userId = firebase.auth().currentUser.uid
        const userBeersRef = db.collection(`users/${userId}/beers`)
        try {
            let recentBeers = []
            const query = userBeersRef.orderBy("lastHad", "desc").limit(3)
            const querySnapshot = await query.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                recentBeers.push(beer)
            })
            this.setState({recentBeers})
        } catch(err) {
            console.err(err)
        }
    }

    getRecommendations = async () => {
        const userId = firebase.auth().currentUser.uid
        console.log("THIS IS THE USER ID", userId)
        const recommendedBeers = []
        try {
            const beers = await db.collection('beers')
            //this line works
            const userQuery = await db.doc(`users/${userId}`).get()
            const preferences = userQuery.data().preferences
            console.log("PREFERENCE", preferences[1]) 
            const beerQuery = beers
                //.where('taste', 'array-contains', preferences[0])
                .where('taste', 'array-contains', preferences[1])
                // .where('taste', 'array-contains', preferences[2])
                .limit(3)
            const querySnapshot = await beerQuery.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                recommendedBeers.push(beer)
                console.log(beer.id)
            })
            // console.log(recommendedBeers.length)
            this.setState({recommendedBeers})
            console.log("STATE>RECOMMENDED BEERS", this.state.recommendedBeers)
        } catch(err) {
            console.err(err)
        }
    }

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        <ScrollView>
                            <View>
                                <Text style={{fontSize:24}}>Your recent beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recentBeers.length ? this.state.recentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={{fontSize:16}}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={{fontSize:24}}>Top beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.frequentBeers.length ? this.state.frequentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={{fontSize:16}}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={{fontSize:24}}>Top picks for you: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recommendedBeers.length ? this.state.recommendedBeers.map(eachBeer =>
                                        <Beer key={eachBeer.id} beer={eachBeer} />) : <Text style={{fontSize:16}}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <Button title='Logout' onPress={() => firebase.auth().signOut()}/>
                        </ScrollView>
            </LinearGradient>
        );
    }
}






