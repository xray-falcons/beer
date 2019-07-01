import React, { Component } from "react";
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
// import console = require("console");

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
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${this.state.page}&_limit=10`
        fetch(url).then(res => res.json()).then(res => this.setState({data: this.state.data.concat(res)}))
    //     let query = await db.collection('beers').where('style.category.name', '==', "North American Lager").orderBy('name').limit(6)
    //     let arr = [];
    //     query.get().then(snapshot => {
    //         snapshot.forEach(doc =>{
    //             let beer = doc.data();
    //             arr.push(beer)
    //     })
    //     this.setState({data: arr})
    // })
}

    renderRow = ({item}) => {
        return(<View style={styles.item}>
            <Image source={{url: item.url}} style={styles.itemImage}/>
            <Text>{item.title}</Text>
            <Text style={style.itemText}>{item.id}</Text>
        </View>)
    }

    handleLoadMore = () => {
       this.setState({page: this.state.page +1},
        this.getData)
    }
    render() {
        console.log(this.props)
        return(
            <FlatList style={styles.container} data={this.state.data}
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
