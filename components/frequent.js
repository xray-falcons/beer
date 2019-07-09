import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { db } from "../server/db";
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Beer from "./beer"

function getFrequent (){

	const [frequentBeers, setFrequent] = React.useState([])

	useEffect(
		async () => {
			try {
		 		const userId = await firebase.auth().currentUser.uid
	        	const userBeersRef = db.collection(`users/${userId}/beers`)
	            const query = userBeersRef.orderBy("times", "desc").limit(5)
	            const unsubscribe = await query.onSnapshot( snapshot => {
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

const Frequent = () => {

	const frequentBeers = getFrequent()

    return (
    	<View style={{marginTop: 10, justifyContent: "space-between"}}>
                <Text style={styles.titleText}>Top beers: </Text>
                <View style={{justifyContent: "space-between", marginTop: 15}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {frequentBeers.length ? frequentBeers.map(eachBeer =>
                        <Beer key={eachBeer.beer.id} beer={eachBeer.beer} />) : <Text style={styles.text}>Like some beers to show here!</Text>}
                </ScrollView>
                </View>
        </View>
    )
}


export default Frequent 

        //             frequentBeers.push(beer)
        //             //console.log("FREQUENT BEERS", frequentBeers)
        //             console.log("BEER", beer.name)
        //             this.setState({frequentBeers})
        //     		console.log(this.state.frequentBeers.length)
// export default class Frequent extends React.Component {
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			//userId: this.props.userId,
// 			frequentBeers: []
// 		}
// 	}
 	
//  	async componentDidMount(){
//  		console.log("mounting...")
//  		const userId = await firebase.auth().currentUser.uid
//  		console.log(userId)
//         const userBeersRef = db.collection(`users/${userId}/beers`)
//         try {
//             let frequentBeers = []
//             const query = userBeersRef.orderBy("times", "desc").limit(5)
//             this.unsubscribe = await query.onSnapshot( snapshot => {
//                 snapshot.docs.map(doc => {
//                 	let beer = doc.data()
//                     frequentBeers.push(beer)
//                     //console.log("FREQUENT BEERS", frequentBeers)
//                     console.log("BEER", beer.name)
//                     this.setState({frequentBeers})
//             		console.log(this.state.frequentBeers.length)
//                 })
//             })
//             //this.setState({frequentBeers})
//         } catch(err) {
//             console.log(err)
//         }
//     }

//     componentWillUnmount(){
//     	console.log("unmounting...")
//         this.unsubscribe()
//     }


// 	render(){
// 		console.log()
// 		return (
//             <View style={{marginTop: 10, justifyContent: "space-between"}}>
//                 <Text style={styles.titleText}>Top beers: </Text>
//                 <View style={{justifyContent: "space-between", marginTop: 15}}>
//                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
//                     {this.state.frequentBeers.length ? this.state.frequentBeers.map(eachBeer =>
//                         <Beer key={eachBeer.beer.id} beer={eachBeer.beer} navigation={this.props.navigation}/>) : <Text style={styles.text}>Like some beers to show here!</Text>}
//                 </ScrollView>
//                 <Button onPress={this.componentDidMount} title="Refresh" />
//                 </View>
//             </View>
// 			)
// 	}

// }