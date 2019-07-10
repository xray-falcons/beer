import React from 'react';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Recent from "./recent-beers"
import Frequent from "./frequent-beers"
import Recommended from "./recommended-beers"

export default class Home extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        { <ScrollView>
                            <Recent navigation={this.props.navigation} />
                            {/* <Frequent navigation={this.props.navigation}/>
                            <Recommended navigation={this.props.navigation} /> */}
                            <Button type="solid" title='Logout' onPress={() => {firebase.auth().signOut()}}/>
                         </ScrollView>}
            </LinearGradient>
        );
    }
}



