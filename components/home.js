import React from 'react';
import {Text, View} from 'react-native';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"

export default class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            recentBeers: [],
            frequentBeers: [],
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

    componentDidMount = async () => {
        const userId = await firebase.auth().currentUser.uid
        this.setState({userId: userId})
        this.getFrequentBeers()
        this.getRecentBeers()
        this.getRecommendations()
        this.getBetterRecommendations()
    }

    getFrequentBeers = async () => {
        const userBeersRef = db.collection(`users/${this.state.userId}/beers`)
        try {
            let frequentBeers = []
            const query = userBeersRef.orderBy("times", "desc").limit(10)
            const querySnapshot = await query.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                frequentBeers.push(beer)
            })
            this.setState({frequentBeers})
        } catch(err) {
            console.log(err)
        }
    }

    getRecentBeers = async () => {
        const userBeersRef = db.collection(`users/${this.state.userId}/beers`)
        try {
            let recentBeers = []
            const query = userBeersRef.orderBy("lastHad", "desc").limit(10)
            const querySnapshot = await query.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                recentBeers.push(beer)
            })
            this.setState({recentBeers})
        } catch(err) {
            console.log(err)
        }
    }

    /*
    Better Logic:
    - Get n preferences
    - Query1 = db.collection(beers).where() w/ all preferences
    - Q1 length > 8 ? choose 8 : continue
    - Outer where loop over length of preferences, reducing by one each time
        - inner for loop over every combination of preferences
    - Q2a = db.collection(beers).where() w/ first len-1
    - Q2b = db.collection(beers).where() w/ last len-1
    - Q2a.concat(Q2b).length > 8 - Q1.len ? choose 8 - Q1.len : continue
    ...
    - Qn = db.collection(beers).where() w/ first len-1
    */
    
    getRecommendations = async () => {
        const recommendedBeers = []
        try {
            const beers = await db.collection('beers')
            const userQuery = await db.doc(`users/${this.state.userId}`).get()
            const preferences = userQuery.data().preferences.map(elem => elem.toLowerCase())
            for (let i = 0; i < preferences.length; i++){
                const beerQuery = beers
                    .where('taste', 'array-contains', preferences[i])
                    .limit(1)
                const querySnapshot = await beerQuery.get()
                querySnapshot.forEach(function(doc){
                    let beer = doc.data()
                    recommendedBeers.push(beer)
                })
            }
            this.setState({recommendedBeers})
        } catch(err) {
            console.log(err)
        }
    }

    getBetterRecommendations = async () => {
        const beerTastes = ["", "sweet", "chocolate", "hoppy", "citrus","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]

        const recommendedBeers = []
        try {
            // const userQuery = await db.doc(`users/${this.state.userId}`).get()
            // const preferences = userQuery.data().preferences.map(elem => elem.toLowerCase())
            const beers = await db.collection('beers').get()
            const tastes = await db.collection('tastes').get()
            beers.forEach(doc=>{
                //console.log(beer.data())
                let beer = doc.data()
                //console.log(beer.weightArr)
                let weights = beer.weightArr
                for (i=0; i < weights.length; i++){
                    if (beer.taste.includes(beerTastes[i])==true){
                        weights[i] = 1
                    }
                }
                console.log(beer.weightArr)
            })    
            //do stuff here
            //set values on beers 
            //
            this.setState({recommendedBeers})
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        <ScrollView>
                            <View style={{marginTop: 80, justifyContent: "space-between"}}>
                                <Text style={styles.titleText}>Your recent beers: </Text>
                                <View style={{justifyContent: "space-between", marginTop: 15}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recentBeers.length ? this.state.recentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                                </View>
                            </View>
                            <View style={{marginTop: 10, justifyContent: "space-between"}}>
                                <Text style={styles.titleText}>Top beers: </Text>
                                <View style={{justifyContent: "space-between", marginTop: 15}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.frequentBeers.length ? this.state.frequentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                                </View>
                            </View>
                            <View style={{marginTop: 10, justifyContent: "space-between"}}>
                                <Text style={styles.titleText}>Top picks for you: </Text>
                                <View style={{justifyContent: "space-between", marginTop: 15}}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recommendedBeers.length ? this.state.recommendedBeers.map(eachBeer =>
                                        <Beer key={eachBeer.id} beer={eachBeer} />) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
            </LinearGradient>
        );
    }
}



