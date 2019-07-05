import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native'

import { Card } from 'react-native-elements'
import 'firebase/firestore';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import Beer from './beer'


export default class BeerListSearch extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        const beers = this.props.navigation.getParam('beers')
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <View style={styles.item}>
                <ScrollView >
                    {beers.map((beer, idx) => {
                       return <Card key={idx} >
                                <Beer beer={beer} navigation={this.props.navigation} />
                            </Card>
                    })}
                </ScrollView>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 70
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
    },
})
