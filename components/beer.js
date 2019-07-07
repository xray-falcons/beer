import React, { Component } from 'react'
import {View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../style/styles';

export default class Beer extends Component {
  render() {
    const beer = this.props.beer
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Beer', {beer: beer}) }>
      <View style={{backgroundColor:"transparent"}}>
        <Image source={{uri:beer.labels.medium}} style={styles.itemImageSmall}/>
        <Text>{beer.name}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}
