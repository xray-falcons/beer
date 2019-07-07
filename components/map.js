import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Button } from "react-native-elements"
import { LinearGradient } from "expo-linear-gradient";
import styles from "../style/styles";
import MapView, { Marker,  } from 'react-native-maps';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const deltas = {
    latitudeDelta: 0.0002,
    longitudeDelta: 0.0091
};

export default class Map extends Component {
    constructor(props) {
        super()
        this.state = {
            region: null,
            errorMessage: null,
        };
    }
    componentWillMount() {
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
            ...deltas
        };
        await this.setState({ region });
    };

    static navigationOptions = {
        header: null
    }

    render() {


        return (
            <MapView
                style={styles1.container}
                region={this.state.region}
                showsUserLocation={true}
                showsMyLocationButton={false}
                zoomEnabled = {true}

            />
        );
    }
}
const styles1 = {
    container: {
        marginTop: 50,
        flex: 1
}
}
