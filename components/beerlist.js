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

export default class BeerList extends Component{
    constructor(){
        super()
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
    }

    renderRow = ({item}) => {
        return(<View style={styles.item}>
           <Image source={{url: item.url}} style={styles.itemImage}/>
            <Text>{item.title}</Text>
            <Text>{item.id}</Text>
        </View>)
    }

    handleLoadMore = () => {
       this.setState({page: this.state.page +1},
        this.getData)
    }
    render() {
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
