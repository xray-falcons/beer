import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import styles from "../style/styles"

export default class Taste extends Component {
    constructor(props) {
        super(props);
        this.state = {
           checked: []
       }
    }

    static navigationOptions = {
        header: null
    }

    isItemChecked(taste) {
        return this.state.checked.indexOf(taste) > -1
    }

    manageToggle = (evt, taste) => {
        if (this.isItemChecked(taste)) {
            this.setState({
                checked: this.state.checked.filter(i => i !== taste)
            })
        } else {
            this.setState({
                checked: [...this.state.checked, taste]
            })
        }
    }

    try = async (tastes) => {
        try {
            const beers = await db.collection('beers');
            let beerArray =[]
            const query = await beers.where('taste', 'array-contains', tastes[0]);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            let filtered = beerArray.filter(beer => {
                for (let i = 0; i < beer.taste.length; i ++) {
                    for (let j = 1; j < tastes.length; j ++) {
                        if (beer.taste[i] === tastes[j]){
                            return beer
                        }
                    }
                }
            })
            this.props.navigation.navigate('List', {
                beers: filtered
            })
        } catch (err)  {
            console.err(err)
        }
    }

    render(){
        const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <ScrollView>
                {beerTastes.map((elem, idx) => {
                    return  (<View key={idx}>
                    <CheckBox
                        title={elem}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.isItemChecked(elem)}
                        onPress={evt => this.manageToggle(evt, elem)}

                    />
                    </View>)
                })
                }
                <Button type='solid' buttonStyle={styles.attentionButton} title='Find Your beers!' onPress={() => this.try(this.state.checked)}/>
            </ScrollView>
    </LinearGradient>)
    }
}
