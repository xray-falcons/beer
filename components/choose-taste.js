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
           checked: [],
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
            console.log(taste)
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
            let filtered = beerArray.filter(beer => {
                for (let j = 1; j < tastes.length; j ++) {
                    for (let i = 0; i < beer.taste.length; i++) {
                        if (beer.taste[i] === tastes[j]) {
                            return beer
                        }
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
            console.trace(err)
        }
    }


    render(){
        const firstTastesArr = beerTastes.slice(0, (beerTastes.length-1)/2);
        const secondTastesArr = beerTastes.slice((beerTastes.length-1)/2);
        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
                <ScrollView>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'center'}}>
                    <View>
                        {firstTastesArr.map((elem, idx) => {
                            return (
                                <CheckBox
                                    key={idx}
                                    title={elem}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                            checked={this.isItemChecked(elem)}
                                            onPress={evt => this.manageToggle(evt, elem)}
                                        />
                                )
                            })}
                    </View>
                    <View>
                        {secondTastesArr.map((elem, idx) => {
                            return (
                                <CheckBox
                                    key={idx}
                                    title={elem}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={this.isItemChecked(elem)}
                                    onPress={evt => this.manageToggle(evt, elem)}
                                />
                            )
                        })}
                    </View>
                </View>
                </ScrollView>
            </LinearGradient>)
    }
}
