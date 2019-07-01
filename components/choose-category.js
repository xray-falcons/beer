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


