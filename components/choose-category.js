import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import firebase from 'firebase';
import { db } from '../server/db';




export default class Category extends Component {
    query = async (beerStyle) => {
        try {
            console.log(787987)
            const beers = await db.collection('beers');
            // console.log(beers)
            let lager = 'North American Lager';
            const query = await beers.where('style.category.name', '==', beerStyle);
            let arr =[]
            // console.log('query', query.data)
            query.get().then(function(querySnapshot){
                querySnapshot.forEach(function (doc){
                    let beer = doc.data();
                    // console.log('beeer', beer)
                    arr.push(beer)
                    console.log(beer)
                })
                console.log(arr.length)
            })


        } catch (err)  {
            console.log(err)

        }

    }
    render(){
        const beerStyles = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager","Other Lager","International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Other Origin","Malternative Beverages"]
        return <View style={styles.container}>
            <Text>HELLO BEER CHOICE</Text>
            {beerStyles.map((elem, idx) => {
            return  <Button key={idx} title={elem} onPress={() => this.query(elem) }/>
            })
            }
            <Button title='{check}' onPress={() => this.query() }/>

            <Button title='LogOUT' onPress={() => firebase.auth().signOut()}/>
        </View>
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


