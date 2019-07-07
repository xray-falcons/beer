import { SearchBar } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import * as React from 'react';
import { Image, View } from 'react-native';
import { db } from "../server/db";
import styles from "../style/styles"

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        //setting default state
        this.state = {  search: '' };
        this.beers = [];
    }
    static navigationOptions = {
        header: null
    }

    try = async (search) => {
        try {
            const beers = await db.collection('beers');
            let beerArray = [];
            const query = beers.where('nameArr', 'array-contains', search.trim().toLowerCase());
            const querySnapshot = await query.get()
            querySnapshot.forEach(doc => {
                let beer = doc.data();
                beerArray.push(beer)
            });
            this.setState({
                beers: beerArray,
                search: ''
            });
            if (beerArray.length) {
                this.props.navigation.navigate('SearchList', {
                    beers: this.state.beers
                })
            } else {
                this.props.navigation.navigate('Random',{
                    name: "Search"
                })
            }
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
                    containerStyle={styles.searchBar}
                    placeholder="What are you looking for?"
                    value={search}
                    onChangeText={text => { this.setState({ search: text }); }}
                    onSubmitEditing={() => this.try(search)}
                />
                <View style={styles.container}>
                    <Image source={require('../style/StumblrLogo.png')} style={styles.searchLogo}
                    />
                </View>
            </LinearGradient>
    )}
}
