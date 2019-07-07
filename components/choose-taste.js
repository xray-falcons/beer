import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import styles, { beerTastes } from "../style/styles"

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
            this.setState({
                checked: []
            })
            const beers = await db.collection('beers');
            let beerArray =[]
            const query = await beers.where('taste', 'array-contains', tastes[0]);
            const querySnapshot = await query.get()
            querySnapshot.forEach(function (doc){
                let beer = doc.data();
                beerArray.push(beer)
            });
            console.log(beerArray.length)
            let filtered = beerArray.filter(beer => {
                for (let j = 1; j < tastes.length; j ++) {
                    console.log(tastes[j])
                    for (let i = 0; i < beer.taste.length; i ++) {
                        if (beer.taste[i] === tastes[j]){
                            return beer
                    }
                }
            })
            if (!filtered.length) {
                filtered = beerArray
            }
            this.props.navigation.navigate('List', {
                beers: filtered
            })
        } catch (err)  {
            console.log(err)
        }
    }

    render(){
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
