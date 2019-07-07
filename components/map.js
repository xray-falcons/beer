import React, { Component } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Button } from "react-native-elements"
import { LinearGradient } from "expo-linear-gradient";
import styles from "../style/styles";
import MapView, { Marker } from 'react-native-maps';
import YelpService from "../services/index";
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
            bars: []
        };
    }
    componentWillMount() {
        this.getLocationAsync();

    }
    renderMarkers() {
        return this.state.bars.map((place, i) => (
            <Marker key={i} title={place.name} coordinate={place.coords} />
        ))
    }
    getBars = async () => {
        const { latitude, longitude } = this.state.region;
        const userLocation = { latitude, longitude };
        const bars = await YelpService.getBars(userLocation);
        this.setState({ bars });
    };

    getLocationAsync = async () => {
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
        await this.getBars();

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

            >{this.renderMarkers()}
            </MapView>
        );
    }
}
const styles1 = {
    container: {
        marginTop: 50,
        flex: 1
}
}
