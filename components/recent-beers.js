import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"


const Recent = (props) => {

	const [recentBeers, setRecent] = React.useState([])

	useEffect(() => {
        const fetchData = async () => {
			try {
		 		const userId = await firebase.auth().currentUser.uid
	        	const userBeersRef = db.collection(`users/${userId}/beers`)
	            const query = userBeersRef.orderBy("lastHad", "desc").limit(10)
	            const unsubscribe = await query.onSnapshot( snapshot => {
	                const recent = snapshot.docs.map(doc => ({
	                	...doc.data()
	                }))
	                setRecent(recent)
                })
		        return () => unsubscribe()
		    	}
	        catch(err){
	        	console.log(err)
            }
        }
        fetchData()
        }, [])

    return (
    	<View style={{marginTop: 80, justifyContent: "space-between"}}>
            <Text style={styles.titleText}>Your recently drunk beers: </Text>
            <View style={{justifyContent: "space-between", marginTop: 15}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {recentBeers.length ? recentBeers.map(eachBeer =>
                    <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={props.navigation}/>) : <Text style={styles.text}>Let's drink some beers!</Text>}
            </ScrollView>
            </View>
        </View>
    )
}

export default Recent
