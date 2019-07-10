import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"

const Recommended = (props) => {
    const [recommendedBeers, setRecs] = React.useState([])

	useEffect(() => {
        const fetchData = async () => {
			try {
                const userId = await firebase.auth().currentUser.uid
                const beersRef = db.collection('beers')
                const user = await db.doc(`users/${userId}`).get()
                const preferences = user.data().preferences.map(elem => elem.toLowerCase())
                const query = beersRef.where('taste', 'array-contains', preferences[0])
                const snapshot = await query.get()
                let recs = [];
                snapshot.forEach(doc => {
                    const beer = doc.data()
                    for (let i = 1; i < preferences.length; i++){
                        for (let j = 0; j < beer.taste.length; j++){
                            if (beer.taste[j] === preferences[i] && !(recs.includes(beer))){
                                recs.push(beer)
                            }
                        }
                    }
                })
                setRecs(recs)
            }
            catch(err){
	        	console.log(err)
            }
        }
        fetchData()
        }, [])

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
