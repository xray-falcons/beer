import React, { Component } from "react";
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    FlatList
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../server/db';
// import { QueryDocumentSnapshot, DocumentSnapshot } from "@google-cloud/firestore";

export default class BeerList extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: [],
            page: 1
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
            const query = await beers.where('style.category.name', '==', name).limit(10);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            console.log('BEEROJASF', beerArray.length)
            console.log('ARRRAAAAAY', beerArray[0])
            console.log('TYPE', typeof beerArray[0].name)

            this.setState({data: beerArray})

        } catch (err)  {
            console.log(err)

        }
}

    renderRow = ({item}) => {

        let beerImage;
        let description;
        if (!item.labels) {
            beerImage = 'https://www.faustbrewing.com/images/beers/types/beerglassthree.png'
        } else {
            beerImage = item.labels.large;
        }

            return(
                <View style={styles.item}>
                    <Button title={item.name} onPress={() => this.props.navigation.navigate('SingleBeer', {
                        beerName: item.name,
                        beerImage: beerImage,
                        abv: item.abv,
                        description: item.description,
                        ibu: item.ibu,
                        // brewery: "mybrewery",
                        style: item.style.category.name
                    }) }/>

                </View>
          )


    }

    handleLoadMore = () => {
       this.setState({page: this.state.page +1},
        this.getData)
    }
    render() {
        console.log(this.props)
        return(
            <FlatList  data={this.state.data}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        />



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
    }
})
