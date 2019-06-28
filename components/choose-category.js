// const docRef = await db.collection('dogs');
// const query = await docRef.where('walking', '==', true);
// let dogs = [];
// query.get().then(function(querySnapshot){
//     querySnapshot.forEach(function (doc){
//         let dog = doc.data();
//         dog.id = doc.id;
//         dogs.push(dog);


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
    query = async () => {
        try {
            console.log(787987)
            const beers = await db.collection('beers');
            // console.log(beers)
            let lager = 'North American Lager';
            const query = await beers.where('style.category.name', '==', lager);
            let arr =[]
            // console.log('query', query.data)
            query.get().then(function(querySnapshot){
                querySnapshot.forEach(function (doc){
                    let beer = doc.data();
                    // console.log('beeer', beer)
                    arr.push(beer)
                    console.log(beer.name)
                })
                console.log(arr.length)
            })


        } catch (err)  {
            console.log(err)

        }

    }
    render(){
        return <View style={styles.container}>
            <Text>HELLO BEER CHOICE</Text>
            <Button title='check' onPress={() => this.query() }/>

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


