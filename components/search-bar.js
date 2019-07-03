import { SearchBar } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import * as React from 'react';
import { Image, Text, View, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import {db} from "../server/db";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = {  search: '' };
        this.beers = [];
    }


    updateSearch = search => {
        this.setState({ search });
        console.log(this.state.search)
    };

    clear = () => {
        this.search.clear();
    };

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData,
            search:text,
        });
    }
    try = async (search) => {
        try {
            const beers = await db.collection('beers');
            let beerArray = []
            const query = await beers.where('nameArr', 'array-contains', search.toLowerCase());
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                console.log(beer.name)
                beerArray.push(beer)
            });
            this.setState({
                beers: beerArray,
                search: ''
            });
            console.log('STATE', this.state.beers.length, this.state.search)
            this.props.navigation.navigate('SearchList', {
                beers: this.state.beers
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { search } = this.state;

        return (

            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <SearchBar
                    placeholder="What is a beer you are looking for...?"
                    value={search}
                    onChangeText={text => { this.setState({ search: text }); }}
                    // onClear={text => this.SearchFilterFunction('')}
                    onSubmitEditing={() => this.try(search)}
                />
                <View style={styles.container}>
                    <Image source={require('../style/StumblrLogo.png')} style={styles.containerImage}
                    />
                </View>
            </LinearGradient>


    );
    }
}
const styles = StyleSheet.create({
    containerImage: {
        width:200,
        height:200,
        marginBottom: 20,
        borderRadius: 100
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
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }

})
