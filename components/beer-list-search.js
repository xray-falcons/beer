import React, { Component } from "react";
import {FlatList} from 'react-native'
import { Card } from 'react-native-elements'
import { LinearGradient } from "expo-linear-gradient";
import Beer from './beer'
import styles from "../style/styles"
import View from "react-native-web/dist/exports/View";


export default class BeerListSearch extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        header: null
    }

    renderItem = ({item}) => {
        return(
            <Card containerStyle={styles.cardContainer}>
                <Beer beer={item} navigation={this.props.navigation} />
            </Card>
      )}

    render() {
        const beers = this.props.navigation.getParam('beers')

        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <FlatList  data={beers}
                       style={styles.marginTop}
                       renderItem={this.renderItem}
                       numColumns={2}
                       keyExtractor={(item, index) => index.toString()}
                       onEndReached={this.handleLoadMore}
                       onEndReachedThreshold={0}
            />
            </LinearGradient>
        )
    }
}
