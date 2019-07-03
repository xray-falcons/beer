import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert, ScrollView
} from 'react-native';
import { db } from '../server/db';



export default class Taste extends Component {
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
        const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy"]

        return <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textBold}>Choose your taste!</Text>
                {beerTastes.map((elem, idx) => {
                    return  <Button key={idx} title={elem = elem[0].toUpperCase() + elem.slice(1)} onPress={() => this.props.navigation.navigate('List', { name : elem}) }/>
                })
                }
            </ScrollView>
            <Button title='CLIIIIICK MEEEEEE' onPress={() => this.try()}/>
        </View>
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
    }
})


