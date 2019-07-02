import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    FlatList
} from 'react-native';
import 'firebase/firestore';
import { db } from '../server/db';

export default class BeerListTaste extends Component{
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
            const query = await beers.where('taste', 'array-contains', name.toLowerCase());
            console.log(query)
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

    renderRow = ({item}) => {
        return(
            <View style={styles.item}>
                <Button title={item.name} onPress={() => this.props.navigation.navigate('Beer', {
                    beerName: item.name,
                    beerImage: item.labels.large,
                    abv: item.abv,
                    description: item.description,
                    ibu: item.ibu,
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
