import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    FlatList, Text
} from 'react-native';
import 'firebase/firestore';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";

export default class BeerListSearch extends Component {

    render() {
        const beers = this.props.navigation.getParam('beers')

        console.log(beers.length)
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <View style={styles.item}>
                    {beers.map((beer, idx) => {
                        return <Button key={idx} title={beer.name} onPress={() => this.props.navigation.navigate('Beer', {
                            beerName: beer.name,
                            beerImage: beer.labels.large,
                            abv: beer.abv,
                            description: beer.description,
                            ibu: beer.ibu,
                            style: beer.style.name,
                            beerId: beer.id
                        }) }/>
                    })}
                </View>
            </LinearGradient>
        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        // justifyContent: 'center',
        //alignItems: 'center',
    },
    item: {
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    itemText:{
        fontSize: 26,
        padding:25
    },
    itemImage:{
        width:"100%",
        height: 200,
        resizeMode: 'cover'
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
