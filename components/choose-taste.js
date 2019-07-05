import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    ScrollView
} from 'react-native';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";



export default class Taste extends Component {
    constructor(props) {
        super(props);
       this.state = {

       }
    }

    static navigationOptions = {
        header: null
    }

    try = async () => {
        try {
            const beers = await db.collection('beers');
            const tastes =['hoppy', 'earthy', 'citrus', 'chocolate', 'full-bodied']
            let beerArray =[]
            const query = await beers.where('taste', 'array-contains', tastes[0]);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });

            let filtered = beerArray.filter(beer => {
                for (let i = 0; i < beer.taste.length; i ++) {
                    for (let j = 1; j < tastes.length; j ++) {
                        if (beer.taste[i] === tastes[j]){
                            console.log(beer.name)
                            return beer
                        }
                    }
                }
            })



            console.log('FFFILW', filtered.length)
            console.log(beerArray.length)




        } catch (err)  {
            console.log(err)

        }

    }


    render(){
        const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]

        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
>

        <View>
            <ScrollView>
                <Button type='solid' color="#841584"  title='CLIIIIICK MEEEEEE' onPress={() => this.try()}/>

                {beerTastes.map((elem, idx) => {
                    return  <Button type='outline' key={idx} title={elem = elem[0].toUpperCase() + elem.slice(1)}
                                    onPress={() => this.props.navigation.navigate('List', { name : elem}) }
                    />
                })
                }
            </ScrollView>
        </View>
    </LinearGradient>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    textBold:{
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center'
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        left: 0,
        right: 0,
        top: 0,
        //CHECK DOCS!!!!! cause this could not work on different devices
        // height: 1000
    },
})


