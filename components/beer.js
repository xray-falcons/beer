import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert, Category
} from 'react-native';
import { styles } from '../style/styles';

export default class Beer extends Component {
  render() {
    const beer = this.props.beer
    return (
      <View>
        <Image source={{uri:beer.labels.medium}} style={{height:100, width: 100}}/>
        <Button title={beer.name} onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }/>
        {/* <Button style={{
         fontSize: 10,
         padding:25
     }}>{beer.name}</Text> */}
      </View>
    )
  }
}
