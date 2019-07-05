import React, { Component } from "react";
import {
    StyleSheet,
    FlatList
} from 'react-native';
import {  Button, Card } from 'react-native-elements'
import 'firebase/firestore';
import { db } from '../server/db';
import {LinearGradient} from "expo-linear-gradient";
import Beer from './beer'


export default class BeerListTaste extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
    }

    renderItem = ({item}) => {
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                <Card>
                    <Beer beer={item} navigation={this.props.navigation} />
                </Card>

      </LinearGradient>
      )}

    render() {
        const beers =  this.props.navigation.getParam('beers')
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
