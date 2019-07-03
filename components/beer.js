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
    console.log("beer props", beer)
    return (
      <View style={styles.container}>
        <Image source={{uri:beer.labels.icon}} style={{height:100, width: 100}}/>
        <Text style={{
         fontSize: 20,
         padding:25
     }}>{beer.name}</Text>
      </View>
    )
  }
}
