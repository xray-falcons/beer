import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/styles";
import Category from "./choose-category";
import Taste from "./choose-taste";
import BeerList from "./beer-list";

const FirstRoute = () => (
    <View style={[styles1.scene]} >
        <Category/>
    </View>
);

const SecondRoute = () => (
    <View style={[styles1.scene]} >
        <Taste/>
    </View>
);
const ThirdRoute = () => {
    return  ( <View style={[styles1.scene]} >
        <BeerList/>
    </View>)
}


export default class TabViewSearch extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Choose your style!'},
            { key: 'second', title: 'Choose your taste!' },
        ],
    };

    render() {
        return (
            <LinearGradient
                colors={["#c36f09", "#eeba0b"]}
                style={styles.linearGradient}
            >
            <View style={styles1.container}>
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
            </View>
            </LinearGradient>
        );
    }
}

const styles1 = StyleSheet.create({
    scene: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
        // marginTop: 65
    }
});
