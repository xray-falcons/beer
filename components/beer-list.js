import React, { Component } from "react";
import {StyleSheet,FlatList,} from 'react-native';
import { Card } from 'react-native-elements'
import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import Beer from './beer'



export default class BeerList extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData = async () => {
        const name = this.props.navigation.getParam('name')
        try {
            const beers = await db.collection('beers');
            let beerArray =[]
            const query = await beers.where('style.category.name', '==', name);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            this.setState({data: beerArray})


        } catch (err)  {
            console.log(err)
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
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <FlatList
                    style={{marginTop: 16}}
                    numColumns={2}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
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
        justifyContent: "space-around"
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
