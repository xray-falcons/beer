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
import BeerList from '../components/beerlist';



export default class Category extends Component {
    query = async (beerStyle) => {
        try {
            const beers = await db.collection('beers');
            let beerArray =[]
            const query = await beers.where('style.category.name', '==', beerStyle);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            console.log(beerArray.length)
            console.log('ARRRAAAAAY', beerArray[0])
            this.props.navigation.navigate('BeerList')

        } catch (err)  {
            console.log(err)

        }

        }

    render(){
        const beerStyles = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager","Other Lager","International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Other Origin","Malternative Beverages"]
        return <View style={styles.container}>
            <Text>Choose your  style!</Text>
            {beerStyles.map((elem, idx) => {
            return  <Button key={idx} title={elem} onPress={() => this.props.navigation.navigate('BeerList', { name : elem}) }/>
            })
            }
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


