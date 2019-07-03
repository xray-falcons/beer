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
//import {styles} from "../style/styles";
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

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <ScrollView>
                            <Text style={{fontSize:24}}>Your recent beers: </Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {this.state.frequentBeers.map((eachBeer)=>
                                <Beer beer={eachBeer.beer}/>)}
                            </ScrollView>
                            <View>
                                <Text style={styles.signUpText}>Your favorite beers: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                </ScrollView>
                            </View>
                            <View>
                                <Text style={styles.signUpText}>Top picks for you: </Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            </ScrollView>
                            </View>
                            <Button title='LogOUT' onPress={() => firebase.auth().signOut()}/>
                        </ScrollView>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 20,
//     },
//     item: {
//         borderBottomWidth: 1,
//         marginBottom: 10,
//     },
//     itemText:{
//         fontSize: 26,
//         padding:25
//     },
//     itemImage:{
//         width:"100%",
//         height: 200,
//         resizeMode: 'cover'
//     }
// })

/*             <FlatList  data={this.state.frequentBeers}
    renderItem={this.renderRow}
    keyExtractor={(item, index) => index.toString()}
/>
*/

// export default class home extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.itemText}>
//                     this works?
//                 </Text>
//             </View>
//         )
//     }
// }


