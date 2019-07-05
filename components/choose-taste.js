import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    ScrollView
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { db } from '../server/db';
import { LinearGradient } from "expo-linear-gradient";
import IconButton from "react-native-vector-icons/Ionicons";


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
            console.log('IF', this.state.checked)
        } else {
            this.setState({
                checked: [...this.state.checked, taste]
            })
            console.log('ELSE', this.state.checked)

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
                            console.log(beer.name)
                            return beer
                        }
                    }
                }
            })
            console.log(tastes, beerArray.length, filtered.length)

            //this.props.navigation.navigate('List') }





        } catch (err)  {
            console.log(err)

        }

    }


    render(){
        const beerTastes = ["sweet", "chocolate", "hoppy", "citrus","full-bodied","sour","spicy", "fruit","light","coffee","earthy", "tropical", "roast", "caramel", "coconut", "porter", "dark", "barley", "malt", "ipa", "grapefruit", "stout", "smokey", "banana", "vanilla", "bitter", "zest", "crispy", "lemon", "raspberries", "oak", "smooth", "bavaria"]

        return(
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <View>

        <View>
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
                <Button type='solid' color="#841584"  title='Find Your beers!' onPress={() => this.try(this.state.checked)}/>

            </ScrollView>
        </View>
            </View>
            </LinearGradient>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    textBold:{
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center'
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
})


