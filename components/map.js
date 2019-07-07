import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Button } from "react-native-elements"
import { LinearGradient } from "expo-linear-gradient";
import styles from "../style/styles";
import MapView, { Marker,  } from 'react-native-maps';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Map extends Component {
    constructor(props) {
        super()
        this.state = {
            region: null,
            errorMessage: null,
        };
    }
    componentWillMount() {
        // if (Platform.OS === 'android') {
        //     this.setState({
        //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        //     });
        // } else {
            this._getLocationAsync();

    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421

        };
        await this.setState({ region });    };

    static navigationOptions = {
        header: null
    }

    render() {


        return (
            <MapView
                style={{flex: 1}}
                region={this.state.region}
                showsUserLocation
                showsMyLocationButton

            />
        );
    }
}
const styles1 = {
    container: {
        width: "100%",
        height: "80%"
}
}
