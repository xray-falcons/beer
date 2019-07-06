import React from "react";
import {FlatList} from 'react-native';
import {Card } from 'react-native-elements'
import {LinearGradient} from "expo-linear-gradient";
import Beer from './beer'
import styles from "../style/styles"


export default class BeerListTaste extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
    }

    renderItem = ({item}) => {
        return(
            <Card containerStyle={{backgroundColor:"transparent"}}>
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
