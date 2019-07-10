import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"

function getFrequent (){

	const [frequentBeers, setFrequent] = React.useState([])

	useEffect(
		() => {
			try {
		 		const userId = firebase.auth().currentUser.uid
	        	const userBeersRef = db.collection(`users/${userId}/beers`)
	            const query = userBeersRef.orderBy("times", "desc").limit(10)
	            const unsubscribe = query.onSnapshot( snapshot => {
	                const frequent = snapshot.docs.map(doc => ({
	                	...doc.data()
	                }))
	                setFrequent(frequent)
	            })
		        return () => unsubscribe()
		    	}
	        catch(err){
	        	console.log(err)
	        }
	    	}, []
	)
	return frequentBeers
}

const Frequent = (props) => {
	const frequentBeers = getFrequent()
    return (
    	<View style={{marginTop: 10, justifyContent: "space-between"}}>
                <Text style={styles.titleText}>In your heavy rotation: </Text>
                <View style={{justifyContent: "space-between", marginTop: 15}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {frequentBeers.length ? frequentBeers.map(eachBeer =>
                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={props.navigation}/>) : <Text style={styles.text}>Let's drink some beers!</Text>}
                </ScrollView>
                </View>
        </View>
    )
}

export default Frequent
