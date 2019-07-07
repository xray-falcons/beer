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
            recommendedBeers: []
        }
    }
    static navigationOptions = {
        headerTitle: "",
        headerRight: (
            <Button type="solid" buttonStyle={styles.attentionButton} title='Logout' onPress={() => firebase.auth().signOut()}/>
        ),
    };

    componentDidMount(){
        this.getFrequentBeers()
        this.getRecentBeers()
        this.getRecommendations()
    }

    getFrequentBeers = async () => {
        const user = this.props.navigation.getParam('user')
        console.log(user)
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
            console.log(err)
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
            console.log(err)
        }
    }

    getRecommendations = async () => {
        const userId = firebase.auth().currentUser.uid
        const recommendedBeers = []
        try {
            const beers = await db.collection('beers')
            const userQuery = await db.doc(`users/${userId}`).get()
            const preferences = userQuery.data().preferences
            const beerQuery = beers
                .where('taste', 'array-contains', preferences[1])
                .limit(3)
            const querySnapshot = await beerQuery.get()
            querySnapshot.forEach(doc=>{
                let beer = doc.data()
                recommendedBeers.push(beer)
            })
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
                            <View>
                                <Text style={styles.titleText}>Your recent beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recentBeers.length ? this.state.recentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={styles.titleText}>Top beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.frequentBeers.length ? this.state.frequentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={styles.titleText}>Top picks for you: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recommendedBeers.length ? this.state.recommendedBeers.map(eachBeer =>
                                        <Beer key={eachBeer.id} beer={eachBeer} />) : <Text style={styles.text}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                        </ScrollView>
            </LinearGradient>
        );
    }
}



