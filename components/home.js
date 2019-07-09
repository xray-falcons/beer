import React from 'react';
import {Button} from "react-native-elements"
import {LinearGradient} from "expo-linear-gradient";
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../style/styles';
import Frequent from "./frequent-beers"
import Recent from "./recent-beers"
import Recommended from "./recommended-beers"

export default class Home extends React.Component {
    static navigationOptions = {
        headerTransparent: true,
        headerTitle: "",
        headerRight: (
            <Button type="solid" buttonStyle={styles.attentionButton} title='Logout' onPress={() => firebase.auth().signOut()}/>
        ),
    };

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}>
                        <ScrollView>
                            <Recent navigation={this.props.navigation} />
                            <Frequent navigation={this.props.navigation}/>
                            <Recommended navigation={this.props.navigation} />
                        </ScrollView>
            </LinearGradient>
        );
    }
}



