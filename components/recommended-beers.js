import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"

function getRecommendations (){

	const [recommendedBeers, setRecs] = React.useState([])

	useEffect(
		() => {
			try {
                const userId = firebase.auth().currentUser.uid
                const beers = db.collection('beers')
                const userQuery = db.doc(`users/${userId}`).get()
                const preferences = userQuery.data().preferences.map(elem => elem.toLowerCase())
                for (let i = 0; i < preferences.length; i++){
                    const beerQuery = beers
                        .where('taste', 'array-contains', preferences[i])
                        .limit(10)
                    const unsubscribe = beerQuery.onSnapshot(snapshot => {
                        const recs = snapshot.docs.map(doc => ({
                            ...doc.data()
                        }))
                        setRecs(recs)

                    })
                    return () => unsubscribe()
                }

            }
            catch(err){
	        	console.log(err)
	        }
	    	}, []
    )
	return recommendedBeers
}

const Recommended = (props) => {
    const recommendedBeers = getRecommendations()
    return (
    	<View style={{marginTop: 10, justifyContent: "space-between"}}>
            <Text style={styles.titleText}>Top picks for you: </Text>
            <View style={{justifyContent: "space-between", marginTop: 15}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {recommendedBeers.length ? recommendedBeers.map((eachBeer, idx) =>
                    <Beer key={idx} beer={eachBeer} navigation={props.navigation} />) : <Text style={styles.text}>Like some beers to show here!</Text>}
            </ScrollView>
            </View>
        </View>
    )
}

export default Recommended
