import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import styles, { beerStyles } from "../style/styles";

export default class Category extends Component {

    static navigationOptions = {
        header: null
    }

    render(){
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <View style={styles.container}>
            <ScrollView>
            {beerStyles.map((elem) => {
            return  <Button key={elem} title={elem} type="clear" titleStyle={styles.buttonText} onPress={() => this.props.navigation.navigate('List', { name : elem}) }/>
            })
            }
            </ScrollView>
        </View>

            </LinearGradient>)
    }
}


