import React, { Component } from "react";
import {FlatList,} from 'react-native';
import { Card } from 'react-native-elements'
import 'firebase/firestore';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import Beer from './beer'
import styles from "../style/styles"

export default class BeerList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    static navigationOptions = {
        header:  null,
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        const name = this.props.navigation.getParam('name')
        try {
            const beers = await db.collection('beers');
            let beerArray = [];
            const query = beers.where('style.category.name', '==', name);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer);
            });
            this.setState({data: beerArray})
        } catch (err)  {
            console.log(err)
        }
    }

    renderItem = ({item}) => {
        return(
            <Card containerStyle={styles.cardContainer}>
                <Beer beer={item} navigation={this.props.navigation} />
            </Card>
      )}

    render() {
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <FlatList
                    numColumns={2}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </LinearGradient>
        )
    }
}
