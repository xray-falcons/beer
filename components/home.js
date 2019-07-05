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
        }
    }

    componentDidMount(){
        this.getFrequentBeers()
        this.getRecentBeers()
    }

    getFrequentBeers = async () => {
        const userId = firebase.auth().currentUser.uid
        const userBeersRef = db.collection(`users/${userId}/beers`)
        try {
            let frequentBeers = []
            const query = await userBeersRef.orderBy("times", "desc").limit(3)
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
            const query = await userBeersRef.orderBy("lastHad", "desc").limit(3)
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

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        <ScrollView>
                            <View>
                                <Text style={style.headText}>Top picks for you: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={style.textBold}>Your recent beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.recentBeers.length ? this.state.recentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={style.itemText}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={style.textBold}>Your favorite beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {this.state.frequentBeers.length ? this.state.frequentBeers.map(eachBeer =>
                                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={style.itemText}>Like some beers to show here!</Text>}
                                </ScrollView>
                            </View>
                            <Button color='black' title='Logout' onPress={() => firebase.auth().signOut()}/>
                        </ScrollView>
            </LinearGradient>
        );
    }
}

const style = StyleSheet.create({
textBold:{
    fontWeight: "bold",
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 24
  },
    itemText:{
        fontSize: 16,
        padding:25,
        marginTop: 25,
        marginBottom: 25,
        textAlign: 'center',
    },
    headText: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 15
      },
})



