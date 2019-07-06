import React, { Component } from "react";
import {View, ScrollView} from 'react-native'
import { Card } from 'react-native-elements'
import { LinearGradient } from "expo-linear-gradient";
import Beer from './beer'
import styles from "../style/styles"


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
                    {beers.map((beer) => {
                       return <Card key={beer.id} containerStyle={{backgroundColor:"transparent"}} >
                                <Beer beer={beer} navigation={this.props.navigation} />
                            </Card>
                    })}
                </ScrollView>
                </View>
            </LinearGradient>
        )
    }
}
