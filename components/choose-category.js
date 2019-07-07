import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import styles from "../style/styles";

export default class Category extends Component {

    static navigationOptions = {
        header: null
    }

    render(){
        const beerStyles = ["British Origin Ales", "Irish Origin Ales", "North American Origin Ales","German Origin Ales", "Belgian And French Origin Ales","International Ale Styles","European-germanic Lager","North American Lager", "International Styles","Hybrid/mixed Beer","Mead, Cider, & Perry","Malternative Beverages"]
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


